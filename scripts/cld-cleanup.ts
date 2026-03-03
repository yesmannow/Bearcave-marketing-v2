#!/usr/bin/env tsx

/**
 * Cloudinary Bulk Rename Script
 *
 * Purpose: Rename unstructured files from Google Drive sync to clean, SEO-friendly names
 * Safety: Performs dry-run by default, requires --execute flag for actual renames
 *
 * Usage:
 *   npm run cleanup:dry-run    # Preview changes
 *   npm run cleanup:execute    # Apply changes
 */

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import path from 'path';

// Load .env.local file
config({ path: path.resolve(process.cwd(), '.env.local') });

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

interface RenameOperation {
  oldPublicId: string;
  newPublicId: string;
  resourceType: 'image' | 'video';
  reason: string;
}

const UNSTRUCTURED_PATTERNS = [
  /^IMG_/i,
  /^VID_/i,
  /^PSX_/i,
  /^DSC_/i,
  /^DCIM_/i,
  /^MVI_/i,
  /^MOV_/i,
  /^PXL_/i,
  /^DJI_/i,
  /^Adobe_Post/i,
  /^\d{4}-\d{2}-\d{2}/,  // Date-based filenames like 2021-05-28
  /^\d{8}_\d{6}/,        // Date-based filenames like 20220527_204513
];

const FEATURED_ASSETS = [
  '317-bbq-logo',
  'graston-technique-logo',
  'ultimate-technologies-logo',
  'hoosierboy-barber-shop-logo',
];

function isUnstructured(filename: string): boolean {
  return UNSTRUCTURED_PATTERNS.some(pattern => pattern.test(filename));
}

function generateCleanName(
  publicId: string,
  resourceType: 'image' | 'video',
  index: number,
  category: string
): string {
  // Find the last slash to separate folder path from filename
  const lastSlashIndex = publicId.lastIndexOf('/');
  const folder = lastSlashIndex !== -1 ? publicId.substring(0, lastSlashIndex) : `studio/${category}`;

  const prefix = resourceType === 'video' ? 'motion' : 'artifact';
  const paddedIndex = String(index).padStart(2, '0');

  return `${folder}/${category}-${prefix}-${paddedIndex}`;
}

interface TagOperation {
  publicId: string;
  tags: string[];
}

async function scanFolder(folderPath: string): Promise<RenameOperation[]> {
  console.log(`\n🔍 Scanning folder: ${folderPath}`);

  const operations: RenameOperation[] = [];

  try {
    const result = await cloudinary.search
      .expression(`folder:${folderPath}/* AND (resource_type:image OR resource_type:video)`)
      .sort_by('created_at', 'asc')
      .max_results(500)
      .execute();

    console.log(`   Found ${result.total_count} resources`);

    let imageCounter = 1;
    let videoCounter = 1;

    for (const resource of result.resources) {
      const filename = resource.public_id.split('/').pop() || '';
      const resourceType = resource.resource_type as 'image' | 'video';

      // Check for featured assets
      const isFeatured = FEATURED_ASSETS.some(asset => filename.includes(asset));
      if (isFeatured) {
        console.log(`   ✨ Tagging featured asset: ${filename}`);
        try {
          if (process.argv.includes('--execute')) {
             await cloudinary.uploader.add_tag('featured', [resource.public_id]);
             console.log(`     ✅ Tagged ${filename} with 'featured'`);
          } else {
             console.log(`     📋 (Dry Run) Would tag ${filename} with 'featured'`);
          }
        } catch (error) {
          console.error(`     ❌ Error tagging ${filename}:`, error);
        }
      }

      if (isUnstructured(filename)) {
        const category = folderPath.split('/').pop() || 'studio';
        const index = resourceType === 'video' ? videoCounter++ : imageCounter++;
        const newPublicId = generateCleanName(resource.public_id, resourceType, index, category);

        operations.push({
          oldPublicId: resource.public_id,
          newPublicId,
          resourceType,
          reason: `Unstructured filename: ${filename}`,
        });
      }
    }

    return operations;
  } catch (error) {
    console.error(`   ❌ Error scanning ${folderPath}:`, error);
    return [];
  }
}

async function performDryRun(folders: string[]): Promise<RenameOperation[]> {
  console.log('\n📋 DRY RUN MODE - No changes will be made\n');
  console.log('═'.repeat(80));

  const allOperations: RenameOperation[] = [];

  for (const folder of folders) {
    const operations = await scanFolder(folder);
    allOperations.push(...operations);
  }

  console.log('\n📊 PROPOSED CHANGES:\n');
  console.log('═'.repeat(80));

  if (allOperations.length === 0) {
    console.log('\n✅ No unstructured files found. All files are already properly named!\n');
    return [];
  }

  allOperations.forEach((op, index) => {
    console.log(`\n${index + 1}. ${op.resourceType.toUpperCase()}`);
    console.log(`   Reason: ${op.reason}`);
    console.log(`   Old: ${op.oldPublicId}`);
    console.log(`   New: ${op.newPublicId}`);
  });

  console.log('\n═'.repeat(80));
  console.log(`\n📈 SUMMARY: ${allOperations.length} files will be renamed`);
  console.log(`   Images: ${allOperations.filter(op => op.resourceType === 'image').length}`);
  console.log(`   Videos: ${allOperations.filter(op => op.resourceType === 'video').length}`);
  console.log('\n💡 To execute these changes, run: npm run cleanup:execute\n');

  return allOperations;
}

async function executeRenames(operations: RenameOperation[]): Promise<void> {
  console.log('\n⚠️  EXECUTE MODE - Changes will be applied!\n');
  console.log('═'.repeat(80));
  console.log(`\n🚀 Renaming ${operations.length} files...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const op of operations) {
    try {
      await cloudinary.uploader.rename(
        op.oldPublicId,
        op.newPublicId,
        { resource_type: op.resourceType, invalidate: true }
      );

      console.log(`✅ ${op.oldPublicId} → ${op.newPublicId}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to rename ${op.oldPublicId}:`, error);
      errorCount++;
    }
  }

  console.log('\n═'.repeat(80));
  console.log(`\n📊 RESULTS:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📈 Total: ${operations.length}\n`);
}

async function main() {
  const args = process.argv.slice(2);
  const executeMode = args.includes('--execute');

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('\n❌ Error: Cloudinary credentials not configured');
    console.error('   Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (or CLOUDINARY_CLOUD_NAME), CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local\n');
    process.exit(1);
  }

  const folders = [
    'studio/photography',
    'studio/graphic-design',
    'studio/proof',
  ];

  console.log('\n🎨 Cloudinary Bulk Cleanup Script');
  console.log('═'.repeat(80));
  console.log(`   Cloud: ${cloudName}`);
  console.log(`   Mode: ${executeMode ? '⚠️  EXECUTE' : '📋 DRY RUN'}`);

  const operations = await performDryRun(folders);

  if (operations.length === 0) {
    process.exit(0);
  }

  if (executeMode) {
    console.log('\n⏳ Starting in 3 seconds... (Ctrl+C to cancel)');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await executeRenames(operations);
  }
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
