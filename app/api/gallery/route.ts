import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { CATEGORY_FOLDERS, type GalleryCategory, type CloudinaryResource, type CloudinarySearchResponse, type MixedMediaResource } from '@/app/types/cloudinary';

// Subfolder slug → { work case study URL, human-readable project name }
const SUBFOLDER_WORK_MAP: Record<string, { relatedWorkUrl: string; displayName: string }> = {
  '317bbq':                    { relatedWorkUrl: '/work/317-bbq',                     displayName: '317 BBQ' },
  'riley-bennett-egloff':      { relatedWorkUrl: '/work/riley-bennett-egloff',         displayName: 'Riley Bennett Egloff' },
  'urgentcare-indy':           { relatedWorkUrl: '/work/urgent-care-indy',             displayName: 'Urgent Care Indy' },
  'hoosierboy-barber-shop':    { relatedWorkUrl: '/work/hoosier-boy-barbershop',       displayName: 'Hoosierboy Barbershop' },
  'tuohy-bailey-moore':        { relatedWorkUrl: '/work/tuohy-bailey-moore',           displayName: 'Tuohy Bailey & Moore' },
  'primarycare-indy':          { relatedWorkUrl: '/work/primary-care-indy',            displayName: 'Primary Care Indy' },
  'perpetual-movement-fitness':{ relatedWorkUrl: '/work/perpetual-movement',           displayName: 'Perpetual Movement Fitness' },
  'taco-ninja':                { relatedWorkUrl: '/work/taco-ninja',                   displayName: 'Taco Ninja' },
  'circle-city-kicks':         { relatedWorkUrl: '/work/circle-city-kicks',            displayName: 'Circle City Kicks' },
  'behr-pet-essentials':       { relatedWorkUrl: '/work/behr-pet-essentials',          displayName: 'Behr Pet Essentials' },
  'herbs-rub':                 { relatedWorkUrl: '/work/herbs-rub',                    displayName: "Herb's Rub" },
  'clean-aesthetics':          { relatedWorkUrl: '/work/clean-aesthetics',             displayName: 'Clean Aesthetics' },
  'primary-colours':           { relatedWorkUrl: '/work/primary-colours',              displayName: 'Primary Colours' },
  'school-80-hoa':             { relatedWorkUrl: '/work/school-80-hoa',                displayName: 'School 80 HOA' },
};

function sanitizeResource(resource: MixedMediaResource): MixedMediaResource {
  const filename = resource.public_id.split('/').pop() || 'Artifact';

  const anchorPattern = /^([a-z0-9-]+)-logo-anchor$/i;
  const unstructuredPatterns = /^(IMG_|VID_|PSX_|DSC_|DCIM_|MVI_|MOV_|PXL_|DJI_|Adobe_Post|\d{4}-\d{2}-\d{2}|\d{8}_\d{6})/i;
  const featuredPattern = /^featured-p-(\d+)$/i;
  const featuredGdPattern = /^featured-gd-(\d+)$/i;

  let displayTitle: string = '';
  let altText: string = '';
  let relatedWorkUrl: string | undefined;

  const featuredMatch = filename.match(featuredPattern);
  const featuredGdMatch = filename.match(featuredGdPattern);
  const anchorMatch = filename.match(anchorPattern);

  // Anchor asset: canonical logo with -logo-anchor suffix
  if (anchorMatch) {
    const anchorSlug = anchorMatch[1];
    // Prefer projectSlug (from asset_folder metadata) for accurate subfolder lookup;
    // fall back to the abbreviated slug in the public_id only if no folder info present.
    const subfolderSlug = resource.projectSlug || '';
    const subWork = SUBFOLDER_WORK_MAP[subfolderSlug] || SUBFOLDER_WORK_MAP[anchorSlug];
    displayTitle = subWork
      ? `${subWork.displayName} \u2014 Brand Mark`
      : `${anchorSlug.replace(/-/g, ' ')} \u2014 Brand Mark`;
    altText = `${displayTitle} logo`;
    if (subWork) relatedWorkUrl = subWork.relatedWorkUrl;
    return {
      ...resource,
      display_name: displayTitle,
      isAnchor: true,
      relatedWorkUrl,
      context: { ...resource.context, custom: { ...resource.context?.custom, alt: altText, caption: displayTitle } },
    };
  }

  // Mapping specific featured-gd assets to titles and case studies
  if (featuredGdMatch) {
    const num = featuredGdMatch[1];
    if (num === '1') {
      displayTitle = 'Indy Bicentennial Identity';
      relatedWorkUrl = '/work/brand-authority-rebuild';
    } else if (num === '2') {
      displayTitle = 'Day at the Track';
      relatedWorkUrl = '/work/conversion-architecture';
    } else if (num === '6') {
      displayTitle = 'Healthcare Identity';
      relatedWorkUrl = '/work/urgent-care-indy';
    } else {
      displayTitle = `Systems Artifact ${num.padStart(2, '0')}`;
    }
    altText = `${displayTitle} - Graphic Design System`;
  }

  // Named asset overrides — match known filenames before falling back to generic logic
  const fnLower = filename.toLowerCase();
  if (!displayTitle && !resource.context?.custom?.caption) {
    if (fnLower.includes('indy_bicentenial') || fnLower.includes('indy_bicentennial') || fnLower.includes('bicentenn')) {
      displayTitle = 'Indy Bicentennial Identity';
      altText = 'Indy Bicentennial Identity - Brand System';
      if (!relatedWorkUrl) relatedWorkUrl = '/work/brand-authority-rebuild';
    } else if ((fnLower.includes('day_at_the_track') || fnLower.includes('day_at_track') || fnLower.includes('2001_day')) && !displayTitle) {
      displayTitle = 'Day at the Track';
      altText = 'Day at the Track - Event Brand System';
      if (!relatedWorkUrl) relatedWorkUrl = '/work/conversion-architecture';
    } else if ((fnLower.includes('health_care') || fnLower.includes('healthcare')) && fnLower.includes('ad')) {
      displayTitle = 'Healthcare Identity';
      altText = 'Healthcare Identity System';
      if (!relatedWorkUrl) relatedWorkUrl = '/work/urgent-care-indy';
    }
  }

  if (resource.context?.custom?.caption) {
    displayTitle = resource.context.custom.caption;
    altText = resource.context.custom.alt || resource.context.custom.caption;
  } else if (!displayTitle) { // Only fallback if displayTitle wasn't set by featuredGd logic
    if (featuredMatch) {
      const num = featuredMatch[1].padStart(2, '0');
      displayTitle = `Featured Capture ${num}`;
      altText = `${displayTitle} - Studio Photography`;
    } else if (unstructuredPatterns.test(filename)) {
      displayTitle = resource.resource_type === 'video' ? 'Motion Study' : 'System Artifact';
      altText = `${displayTitle} - ${resource.format.toUpperCase()} ${resource.resource_type}`;
    } else {
      displayTitle = filename
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
      altText = displayTitle;
    }
  }

  // Relational case study links — triggered by slug patterns anywhere in public_id
  const pid = resource.public_id.toLowerCase();
  if (!relatedWorkUrl) {
    if (pid.includes('317-bbq') || pid.includes('317bbq')) {
      relatedWorkUrl = '/work/brand-authority-rebuild';
    } else if (pid.includes('ultimate_tech') || pid.includes('ultimate-tech') || pid.includes('ultimate_technologies')) {
      relatedWorkUrl = '/work/revenue-acceleration';
    } else if (pid.includes('urgent_care') || pid.includes('urgent-care') || pid.includes('urgentcare')) {
      relatedWorkUrl = '/work/urgent-care-indy';
    } else if (pid.includes('hoosierboy') || pid.includes('hoosier-boy') || pid.includes('hoosier_boy')) {
      relatedWorkUrl = '/work/hoosier-boy-barbershop';
    } else if (pid.includes('russell') && pid.includes('paint')) {
      relatedWorkUrl = '/work/russell-painting';
    }
  }

  // Legacy workId kept for backwards compatibility
  const workId: string | undefined = undefined;

  return {
    ...resource,
    display_name: displayTitle!,
    workId,
    relatedWorkUrl,
    context: {
      ...resource.context,
      custom: {
        ...resource.context?.custom,
        alt: altText!,
        caption: displayTitle!,
      },
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') as GalleryCategory | null;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    console.log('🔍 Gallery API Request:', { category });

    // Debug environment variables starting with CLOUDINARY
    const cloudinaryEnvKeys = Object.keys(process.env).filter(key => key.includes('CLOUDINARY'));
    console.log('🔑 Available Cloudinary Env Keys:', cloudinaryEnvKeys);

    const isConfigured = !!(cloudName && apiKey && apiSecret);
    console.log(`Cloudinary Configured: ${isConfigured ? 'YES' : 'NO'}`);

    if (!category || !CATEGORY_FOLDERS[category]) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: photography, graphic-design, proof' },
        { status: 400 }
      );
    }

    if (!isConfigured) {
      console.error('❌ Server-side environment variables missing!');
      return NextResponse.json(
        {
          error: 'Server-side environment variables missing.',
          message: 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET must be set in .env.local',
          debug: {
            cloud_name: !!cloudName,
            api_key: !!apiKey,
            api_secret: !!apiSecret,
          }
        },
        { status: 401 }
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const folderPath = CATEGORY_FOLDERS[category];

    console.log(`🔎 Searching folder: ${folderPath}`);

    const result = await cloudinary.search
      .expression(`folder:${folderPath}/* AND (resource_type:image OR resource_type:video)`)
      .sort_by('created_at', 'desc')
      .max_results(500)
      .with_field('context')
      .with_field('tags')
      .execute() as CloudinarySearchResponse;

    console.log(`✅ Found ${result.total_count} resources in ${folderPath}`);

    const mixedMediaResources: MixedMediaResource[] = result.resources
      .filter(resource =>
        (resource.resource_type === 'image' || resource.resource_type === 'video') &&
        !resource.public_id.includes('bio-featured-')
      )
      .map(resource => {
        let blurDataURL: string | undefined;
        if (resource.resource_type === 'image') {
          // Generate a tiny blurred version for image placeholders
          blurDataURL = cloudinary.url(resource.public_id, {
            width: 10,
            effect: 'blur:1000',
            quality: 'auto',
            fetch_format: 'auto',
          });
        }

        // Derive project slug from asset_folder metadata (dynamic folder mode)
        const assetFolder: string = (resource as CloudinaryResource & { asset_folder?: string }).asset_folder || '';
        const folderSlug = assetFolder.split('/').pop() || '';
        const subWork = SUBFOLDER_WORK_MAP[folderSlug];

        const baseResource: MixedMediaResource = {
          public_id: resource.public_id,
          resource_type: resource.resource_type as 'image' | 'video',
          width: resource.width,
          height: resource.height,
          format: resource.format,
          secure_url: resource.secure_url,
          duration: resource.duration,
          context: resource.context,
          colors: resource.colors,
          tags: resource.tags,
          blurDataURL,
          projectSlug: folderSlug || undefined,
        };

        const sanitized = sanitizeResource(baseResource);

        // Apply subfolder-derived relatedWorkUrl if sanitizeResource didn't set one
        if (subWork && !sanitized.relatedWorkUrl) {
          sanitized.relatedWorkUrl = subWork.relatedWorkUrl;
        }

        return sanitized;
      })
      .sort((a, b) => {
        // Anchor assets always sort first (canonical brand marks)
        if (a.isAnchor && !b.isAnchor) return -1;
        if (!a.isAnchor && b.isAnchor) return 1;

        const aFilename = a.public_id.split('/').pop() || '';
        const bFilename = b.public_id.split('/').pop() || '';

        const aMatchP = aFilename.match(/^featured-p-(\d+)$/i);
        const bMatchP = bFilename.match(/^featured-p-(\d+)$/i);

        const aMatchGd = aFilename.match(/^featured-gd-(\d+)$/i);
        const bMatchGd = bFilename.match(/^featured-gd-(\d+)$/i);

        // Both are featured photography assets
        if (aMatchP && bMatchP) {
          return parseInt(aMatchP[1], 10) - parseInt(bMatchP[1], 10);
        }
        // Both are featured graphic design assets
        if (aMatchGd && bMatchGd) {
          return parseInt(aMatchGd[1], 10) - parseInt(bMatchGd[1], 10);
        }

        // Photography prioritization
        if (aMatchP) return -1;
        if (bMatchP) return 1;

        // Graphic Design prioritization
        if (aMatchGd) return -1;
        if (bMatchGd) return 1;

        // Prioritize manually tagged featured assets next
        const aIsFeatured = a.tags?.includes('featured') ? 1 : 0;
        const bIsFeatured = b.tags?.includes('featured') ? 1 : 0;
        return bIsFeatured - aIsFeatured;
      });

    return NextResponse.json({
      success: true,
      category,
      folder: folderPath,
      total: result.total_count,
      resources: mixedMediaResources,
    });
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery resources', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
