/**
 * Proof Taxonomy Migration — "Search, Move, and Clean"
 *
 * Phase 1: Rename the canonical logo in each subfolder to a clean slug anchor.
 * Phase 2: Rename root-level duplicates with a -legacy suffix.
 * Phase 3: Dry-run by default; pass --execute to apply.
 */

import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DRY_RUN = !process.argv.includes('--execute');

// ─── Phase 1: Subfolder anchor renames ─────────────────────────────────────
// Format: [folder, oldPublicId, newAnchorId]
const SUBFOLDER_RENAMES = [
  ['studio/proof/317bbq',               '317-bbq-logo',                             '317-bbq-logo-anchor'],
  ['studio/proof/behr-pet-essentials',  'Behr_pet_essentials_logo',                 'behr-pet-logo-anchor'],
  ['studio/proof/circle-city-kicks',    'circle_city_kicks_logo',                   'cck-logo-anchor'],
  ['studio/proof/clean-aesthetics',     'CA_Logo_-_Primary_full_color',             'clean-aesthetics-logo-anchor'],
  ['studio/proof/herbs-rub',            'Herbs_Rub_Logo',                           'herbs-rub-logo-anchor'],
  ['studio/proof/hoosierboy-barber-shop','Hoosierboy_Barbershop_logo_1',            'hoosierboy-logo-anchor'],
  ['studio/proof/perpetual-movement-fitness','Perpetual_Movement_Logo',             'pmf-logo-anchor'],
  ['studio/proof/primary-colours',      'PC-Logo-PNG-e1506002890460',               'primary-colours-logo-anchor'],
  ['studio/proof/primarycare-indy',     'PMC_PrimaryCare-Large_TransparentBG',      'primarycare-logo-anchor'],
  ['studio/proof/riley-bennett-egloff', 'Riley_Bennet_Egloff_logo',                 'rbe-logo-anchor'],
  ['studio/proof/school-80-hoa',        '5379090_orig',                             'school-80-logo-anchor'],
  ['studio/proof/taco-ninja',           'taco_ninja_logo',                          'taco-ninja-logo-anchor'],
  ['studio/proof/tuohy-bailey-moore',   'TBM_Small',                                'tbm-logo-anchor'],
  ['studio/proof/urgentcare-indy',      'Urgent_Care_Indy_Logo_-_22',               'urgentcare-logo-anchor'],
];

// ─── Phase 3: RBE stat asset renames ───────────────────────────────────────
// Rename verbose stat filenames to clean API-consumable slugs.
// Full public_id path required since these assets live inside subfolders.
const STAT_RENAMES = [
  // RBE: verbose stat filename → clean API slug
  [
    'studio/proof/riley-bennett-egloff/Web_Traffic_Report-2022-01-01_2022-07-15',
    'studio/proof/riley-bennett-egloff/rbe-stat-traffic-2022',
  ],
  // TBM: logo mark → anchor pattern
  [
    'studio/proof/tuohy-bailey-moore/Logo_1',
    'studio/proof/tuohy-bailey-moore/tbm-logo-anchor',
  ],
  // TBM: environmental hero → descriptive slug
  [
    'studio/proof/tuohy-bailey-moore/law-firm-18',
    'studio/proof/tuohy-bailey-moore/tbm-hero-environmental',
  ],
  // Hoosier Boy: business card scan → descriptive artifact slug
  [
    'studio/proof/hoosierboy-barber-shop/Bcard_Google2',
    'studio/proof/hoosierboy-barber-shop/hoosierboy-bcard-artifact',
  ],
  // Hoosier Boy: QR review bridge card (unnamed) → descriptive slug
  [
    'studio/proof/hoosierboy-barber-shop/Untitled',
    'studio/proof/hoosierboy-barber-shop/hoosierboy-qr-feedback-artifact',
  ],
  // Taco Ninja: Facebook social asset → anchor pattern
  [
    'studio/proof/taco-ninja/01_facebook-01',
    'studio/proof/taco-ninja/taco-ninja-logo-anchor',
  ],
  // Taco Ninja: brand playbook doc → descriptive artifact slug
  [
    'studio/proof/taco-ninja/Taco_Ninja_-Brand_Playbook',
    'studio/proof/taco-ninja/taco-ninja-playbook-artifact',
  ],
  // Taco Ninja: color scheme document → semantic slug
  [
    'studio/proof/taco-ninja/ColorSchemeIdeas',
    'studio/proof/taco-ninja/taco-ninja-color-logic',
  ],
  // Primary Care Indy: combined logo mark → anchor pattern
  [
    'studio/proof/primarycare-indy/Primary_Care_Logo_with_PMC',
    'studio/proof/primarycare-indy/pci-logo-anchor',
  ],
  // Primary Care Indy: keyboard metaphor image → descriptive artifact slug
  [
    'studio/proof/primarycare-indy/IMG_1876-2',
    'studio/proof/primarycare-indy/pci-digital-metaphor-artifact',
  ],
  // Primary Care Indy: clinical hero → descriptive slug
  [
    'studio/proof/primarycare-indy/PMC-Dr.-PIke-Patient-Room',
    'studio/proof/primarycare-indy/pci-hero-clinical',
  ],
  // Piko Project: live studio interface screenshot → semantic slug
  [
    'studio/proof/piko-project/Screenshot_of_Piko_Artist_V3',
    'studio/proof/piko-project/piko-studio-interface',
  ],
  // Piko Project: animated DJ tips reference → artifact slug
  [
    'studio/proof/piko-project/Digital-DJ-Tips-GIF',
    'studio/proof/piko-project/piko-dj-tips-artifact',
  ],
  // Piko Project: numbered DJ reference image → clean process slug
  [
    'studio/proof/piko-project/dj-2581269_1280',
    'studio/proof/piko-project/piko-process-reference',
  ],
];

// ─── Phase 2: Root legacy renames ──────────────────────────────────────────
// Root assets that have a subfolder equivalent — mark as -legacy
const ROOT_LEGACY_RENAMES = [
  ['Riley_Bennett_Egloff_logo',                       'rbe-logo-legacy'],
  ['hoosierboy-barber-shop-logo',                     'hoosierboy-logo-legacy'],
  ['Perpetual_Movement_Coaching-_Primary_Logo_2020',  'pmf-primary-logo-legacy'],
  ['thouhy-bailey-and-moore-logo',                    'tbm-logo-legacy'],
  ['thouhy-bailey-and-moore-logo2',                   'tbm-logo2-legacy'],
];

// ─── Helpers ────────────────────────────────────────────────────────────────

async function assetExists(publicId) {
  try {
    await cloudinary.api.resource(publicId);
    return true;
  } catch {
    return false;
  }
}

async function renameAsset(oldId, newId, label) {
  if (DRY_RUN) {
    console.log(`  [DRY] ${label}: ${oldId} → ${newId}`);
    return { ok: true, dryRun: true };
  }
  try {
    await cloudinary.uploader.rename(oldId, newId, { invalidate: true });
    console.log(`  ✅ ${label}: ${oldId} → ${newId}`);
    return { ok: true };
  } catch (e) {
    console.error(`  ❌ ${label}: ${oldId} → ${newId} | ${e.message}`);
    return { ok: false, error: e.message };
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(DRY_RUN ? '=== DRY RUN (pass --execute to apply) ===\n' : '=== EXECUTING RENAMES ===\n');

  let passed = 0, failed = 0, skipped = 0;

  // ── Phase 1: Subfolder anchor renames ──
  console.log('── PHASE 1: Subfolder Anchor Renames ──');
  for (const [folder, oldId, newId] of SUBFOLDER_RENAMES) {
    const slug = folder.split('/').pop();

    // Check source exists
    const srcExists = await assetExists(oldId);
    if (!srcExists) {
      console.log(`  ⚠️  SKIP [${slug}]: source "${oldId}" not found`);
      skipped++;
      continue;
    }

    // Check target doesn't already exist
    const destExists = await assetExists(newId);
    if (destExists) {
      console.log(`  ⚠️  SKIP [${slug}]: target "${newId}" already exists`);
      skipped++;
      continue;
    }

    const result = await renameAsset(oldId, newId, slug);
    result.ok ? passed++ : failed++;
  }

  // ── Phase 3: Stat asset renames (full public_id paths) ──
  console.log('\n── PHASE 3: Stat Asset Renames ──');
  for (const [oldId, newId] of STAT_RENAMES) {
    const srcExists = await assetExists(oldId);
    if (!srcExists) {
      console.log(`  ⚠️  SKIP: source "${oldId}" not found`);
      skipped++;
      continue;
    }

    const destExists = await assetExists(newId);
    if (destExists) {
      console.log(`  ⚠️  SKIP: target "${newId}" already exists`);
      skipped++;
      continue;
    }

    const result = await renameAsset(oldId, newId, 'STAT');
    result.ok ? passed++ : failed++;
  }

  // ── Phase 2: Root legacy renames ──
  console.log('\n── PHASE 2: Root Legacy Renames ──');
  for (const [oldId, newId] of ROOT_LEGACY_RENAMES) {
    const srcExists = await assetExists(oldId);
    if (!srcExists) {
      console.log(`  ⚠️  SKIP: source "${oldId}" not found`);
      skipped++;
      continue;
    }

    const destExists = await assetExists(newId);
    if (destExists) {
      console.log(`  ⚠️  SKIP: target "${newId}" already exists`);
      skipped++;
      continue;
    }

    const result = await renameAsset(oldId, newId, 'ROOT→LEGACY');
    result.ok ? passed++ : failed++;
  }

  console.log(`\n─── Summary ───`);
  console.log(`  Passed : ${passed}`);
  console.log(`  Failed : ${failed}`);
  console.log(`  Skipped: ${skipped}`);
  if (DRY_RUN) {
    console.log('\nRun with --execute to apply all renames.');
  }
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
