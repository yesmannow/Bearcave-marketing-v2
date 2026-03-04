import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import type { CloudinaryResource, MixedMediaResource } from '@/app/types/cloudinary';

export type ProjectManifest = {
  layout: 'dashboard' | 'gallery' | 'heritage' | 'evolution' | 'conversion' | 'showcase' | 'lifestyle' | 'hospitality' | 'clinical' | 'workstation';
  displayName: string;
  relatedWorkUrl: string;
  accent?: string;
  hero: string[];
  stats: string[];
  publications: string[];
  branding: string[];
  process?: string[];
  technical?: string[];
  ux?: string[];        // UX artifacts: QR cards, review bridges, app screenshots
  strategy?: string[];  // Brand strategy docs: playbooks, color specs, guidelines
  metaphor?: string[];  // Conceptual/metaphorical assets for digital-physical bridge
  exclude?: string[]; // asset filename fragments to drop from all buckets
};

export type ProjectAssets = {
  hero: MixedMediaResource[];
  stats: MixedMediaResource[];
  publications: MixedMediaResource[];
  branding: MixedMediaResource[];
  process: MixedMediaResource[];
  technical: MixedMediaResource[];
  ux: MixedMediaResource[];
  strategy: MixedMediaResource[];
  metaphor: MixedMediaResource[];
  gallery: MixedMediaResource[];
};

export type ProjectResponse = {
  success: boolean;
  slug: string;
  manifest: ProjectManifest;
  assets: ProjectAssets;
  total: number;
};

const PROJECT_MANIFESTS: Record<string, ProjectManifest> = {
  'riley-bennett-egloff': {
    layout: 'dashboard',
    displayName: 'Riley Bennett Egloff',
    relatedWorkUrl: '/work/riley-bennett-egloff',
    hero: ['attorneys'],
    stats: [
      'web_traffic_report',
      'rbe-stat-traffic',
      'mailchimp_performance',
      '2021_rbe',
      'analytics_report',
      'marketing_analytics',
    ],
    publications: ['khart_article', 'dtl_article', 'khart', '_dtl'],
    branding: ['rbe-logo-anchor', 'riley_benn'],
  },
  '317bbq': {
    layout: 'gallery',
    displayName: '317 BBQ',
    relatedWorkUrl: '/work/317-bbq',
    hero: ['logo-11', '317bbq+logo-11', '317bbq_logo-11'],
    branding: ['317-bbq-logo-anchor', '317-bbq-logo', '317bbq_logo', '317_bbq_logo'],
    stats: [],
    publications: [],
  },
  'tuohy-bailey-moore': {
    layout: 'heritage',
    displayName: 'Tuohy Bailey & Moore',
    relatedWorkUrl: '/work/tuohy-bailey-moore',
    accent: '#D4AF37',
    hero: ['law-firm-18', 'tbm-hero-environmental', 'law_firm_18'],
    branding: ['tbm-logo-anchor', 'logo_1', 'tbm_small'],
    technical: ['fav_x21eb0'],
    stats: [],
    publications: [],
  },
  'circle-city-kicks': {
    layout: 'evolution',
    displayName: 'Circle City Kicks',
    relatedWorkUrl: '/work/circle-city-kicks',
    accent: '#E63946',
    hero: ['circle_city_kicks_logo', 'circle-city-kicks-logo-anchor'],
    branding: [
      'circle_city_kicks_-_text_only',
      'text_only_-_dark',
      'circle-city-kicks-logo',
    ],
    process: ['logo_draft', 'logo_8'],
    publications: ['eid_-_quote_red_nanum', 'quote_red_nanum', 'eid_quote'],
    stats: [],
  },
  'behr-pet-essentials': {
    layout: 'conversion',
    displayName: 'Behr Pet Essentials',
    relatedWorkUrl: '/work/behr-pet-essentials',
    accent: '#8ECAE6',
    hero: ['dog_summer_sale-1', 'dog_summer_sale', 'summer_sale'],
    branding: ['behr_pet_essentials_logo', 'behr-pet-logo', 'behr_pet'],
    stats: ['complete_solution_cats'],          // infographic — educational funnels
    publications: ['my_project_8'],              // problem/solution featured piece
    technical: ['big_sale', 'cat_bullets_sale'], // direct-response sale banners
    exclude: ['complerte_solution_cats'],        // typo duplicate — suppress from all buckets
  },
  'piko-project': {
    layout: 'workstation',
    displayName: 'Piko Project',
    relatedWorkUrl: '/work/piko-project',
    accent: '#00D4FF',
    hero: ['dj-studio-mixer', 'dj_studio_mixer'],
    branding: ['piko-logo'],
    ux: [
      'screenshot_of_piko_artist_v3',
      'piko-studio-interface',
      'piko_artist',
      'screenshot_of_piko',
    ],
    process: [
      'dj-2581269_1280',
      'dj_2581269',
      'piko-process-reference',
      'digital-dj-tips',
      'digital_dj_tips',
      'piko-dj-tips',
    ],
    stats: [],
    publications: [],
  },
  'primarycare-indy': {
    layout: 'clinical',
    displayName: 'Primary Care Indy',
    relatedWorkUrl: '/work/primary-care-indy',
    accent: '#0077B6',
    hero: ['pmc-dr.-pike-patient-room', 'pci-hero-clinical', 'pmc-dr', 'patient-room'],
    branding: [
      'pci-logo-anchor',
      'primary_care_logo_with_pmc',
      'primary_care_logo',
      'primary_care_half_page_ad',
    ],
    metaphor: ['img_1876-2', 'pci-digital-metaphor', 'img_1876'],
    stats: [],
    publications: [],
  },
  'taco-ninja': {
    layout: 'hospitality',
    displayName: 'Taco Ninja',
    relatedWorkUrl: '/work/taco-ninja',
    accent: '#FFB800',
    hero: ['logo-1-mock', 'logo_1_mock', 'logo-1'],
    branding: ['taco-ninja-logo-anchor', '01_facebook-01', '01_facebook'],
    strategy: ['colorscheme', 'taco-ninja-color-logic', 'taco_ninja_-brand_playbook', 'taco-ninja-playbook'],
    stats: [],
    publications: [],
  },
  'hoosierboy-barber-shop': {
    layout: 'lifestyle',
    displayName: 'Hoosier Boy Barbershop',
    relatedWorkUrl: '/work/hoosier-boy-barber-shop',
    accent: '#B22222',
    hero: ['barbershop-4484297_1920', 'barbershop-4484297'],
    branding: ['hoosierboy-logo-anchor', 'hoosierboy-barber-shop-logo', 'bcard_google2', 'hoosierboy-bcard'],
    ux: ['untitled', 'hoosierboy-qr-feedback'],
    stats: [],
    publications: [],
  },
  'clean-aesthetics': {
    layout: 'showcase',
    displayName: 'Clean Aesthetics',
    relatedWorkUrl: '/work/clean-aesthetics',
    accent: '#C8A2C8',
    hero: ['ca_logo_-_primary_full_color', 'ca_logo_-_primary'],
    branding: [
      'ca_logo_-_primary_full_color',
      'ca_logo_-_name_only_full_color',
      'ca_logo_-_secondary_ful_color',  // note: intentional typo in source filename
      'c_only',
    ],
    stats: [],
    publications: [],
  },
};

function isExcluded(publicId: string, manifest: ProjectManifest): boolean {
  if (!manifest.exclude || manifest.exclude.length === 0) return false;
  const filename = publicId.split('/').pop()?.toLowerCase().replace(/[+\s]/g, '_') || '';
  return manifest.exclude.some(e => filename.includes(e.toLowerCase().replace(/[+\s]/g, '_')));
}

function categorizeAsset(
  publicId: string,
  manifest: ProjectManifest
): keyof ProjectAssets {
  const filename = publicId.split('/').pop()?.toLowerCase().replace(/[+\s]/g, '_') || '';

  const matches = (patterns: string[]) =>
    patterns.some(p => filename.includes(p.toLowerCase().replace(/[+\s]/g, '_')));

  // Priority: stats > publications > strategy > metaphor > ux > process > technical > branding > hero > gallery
  if (manifest.stats.length > 0 && matches(manifest.stats)) return 'stats';
  if (manifest.publications.length > 0 && matches(manifest.publications)) return 'publications';
  if (manifest.strategy && manifest.strategy.length > 0 && matches(manifest.strategy)) return 'strategy';
  if (manifest.metaphor && manifest.metaphor.length > 0 && matches(manifest.metaphor)) return 'metaphor';
  if (manifest.ux && manifest.ux.length > 0 && matches(manifest.ux)) return 'ux';
  if (manifest.process && manifest.process.length > 0 && matches(manifest.process)) return 'process';
  if (manifest.technical && manifest.technical.length > 0 && matches(manifest.technical)) return 'technical';
  if (matches(manifest.branding)) return 'branding';
  if (matches(manifest.hero)) return 'hero';
  return 'gallery';
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const manifest = PROJECT_MANIFESTS[slug];

    if (!manifest) {
      return NextResponse.json(
        { error: `No project manifest found for: ${slug}` },
        { status: 404 }
      );
    }

    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!(cloudName && apiKey && apiSecret)) {
      return NextResponse.json(
        { error: 'Cloudinary not configured' },
        { status: 401 }
      );
    }

    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

    const folderPath = `studio/proof/${slug}`;

    const result = await cloudinary.search
      .expression(`folder:${folderPath}/* AND (resource_type:image OR resource_type:video)`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .with_field('context')
      .with_field('tags')
      .execute();

    const assets: ProjectAssets = {
      hero: [],
      stats: [],
      publications: [],
      branding: [],
      process: [],
      technical: [],
      ux: [],
      strategy: [],
      metaphor: [],
      gallery: [],
    };

    for (const r of result.resources as CloudinaryResource[]) {
      let blurDataURL: string | undefined;
      if (r.resource_type === 'image') {
        blurDataURL = cloudinary.url(r.public_id, {
          width: 10,
          effect: 'blur:1000',
          quality: 'auto',
          fetch_format: 'auto',
        });
      }

      const filename = r.public_id.split('/').pop() || '';
      const isAnchor = /^([a-z0-9-]+)-logo-anchor$/i.test(filename);

      const resource: MixedMediaResource = {
        public_id: r.public_id,
        resource_type: r.resource_type as 'image' | 'video',
        width: r.width,
        height: r.height,
        format: r.format,
        secure_url: r.secure_url,
        duration: r.duration,
        context: r.context,
        colors: r.colors,
        tags: r.tags,
        blurDataURL,
        projectSlug: slug,
        isAnchor,
      };

      // Skip assets matching the exclude list (e.g. typo duplicates)
      if (isExcluded(r.public_id, manifest)) continue;

      const category = categorizeAsset(r.public_id, manifest);
      assets[category].push(resource);
    }

    // Anchor assets sort first within branding; process assets sort by filename (draft order)
    assets.branding.sort((a, b) => (b.isAnchor ? 1 : 0) - (a.isAnchor ? 1 : 0));
    assets.process.sort((a, b) => {
      const fa = a.public_id.split('/').pop()?.toLowerCase() || '';
      const fb = b.public_id.split('/').pop()?.toLowerCase() || '';
      return fa.localeCompare(fb);
    });

    return NextResponse.json({
      success: true,
      slug,
      manifest,
      assets,
      total: result.total_count,
    } satisfies ProjectResponse);
  } catch (error) {
    console.error('Project API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch project assets',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
