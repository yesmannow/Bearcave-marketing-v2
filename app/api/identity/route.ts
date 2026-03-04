import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import type { MixedMediaResource } from '@/app/types/cloudinary';

// Confirmed folder locations (user-verified via Cloudinary MCP)
const IDENTITY_ASSETS = [
  { id: 'bio-featured-1', folder: 'studio/photography',    identityRole: 'hero'      as const, identityPage: '/' },
  { id: 'bio-featured-2', folder: 'studio/graphic-design', identityRole: 'resume'    as const, identityPage: '/resume' },
  { id: 'bio-featured-3', folder: 'studio/photography',    identityRole: 'signature' as const, identityPage: '/' },
  { id: 'bio-featured-4', folder: 'studio/photography',    identityRole: 'parallax'  as const, identityPage: '/work' },
];

interface CloudinaryResourceDetail {
  public_id: string;
  resource_type: string;
  format: string;
  width: number;
  height: number;
  secure_url: string;
  duration?: number;
  context?: { custom?: { alt?: string; caption?: string; [key: string]: string | undefined } };
  colors?: Array<[string, number]>;
  tags?: string[];
}

export async function GET() {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary credentials not configured' },
        { status: 401 }
      );
    }

    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

    // One direct resource() call per asset — no pagination, no wildcard issues
    const results = await Promise.allSettled(
      IDENTITY_ASSETS.map(({ id, folder }) =>
        cloudinary.api.resource(`${folder}/${id}`, {
          resource_type: 'image',
          context: true,
          tags: true,
          colors: true,
        }) as Promise<CloudinaryResourceDetail>
      )
    );

    const identityAssets = results
      .map((result, i) => {
        if (result.status === 'rejected') {
          console.warn(`⚠️  Identity asset not found: ${IDENTITY_ASSETS[i].folder}/${IDENTITY_ASSETS[i].id}`, result.reason);
          return null;
        }

        const r = result.value;
        const { identityRole, identityPage } = IDENTITY_ASSETS[i];

        const blurDataURL = cloudinary.url(r.public_id, {
          width: 10,
          effect: 'blur:1000',
          quality: 'auto',
          fetch_format: 'auto',
        });

        const asset: MixedMediaResource & { identityRole: string; identityPage: string } = {
          public_id:     r.public_id,
          resource_type: r.resource_type as 'image' | 'video',
          format:        r.format,
          width:         r.width,
          height:        r.height,
          secure_url:    r.secure_url,
          duration:      r.duration,
          context:       r.context,
          colors:        r.colors,
          tags:          r.tags,
          blurDataURL,
          identityRole,
          identityPage,
        };

        return asset;
      })
      .filter(Boolean);

    console.log(`✅ Identity API: resolved ${identityAssets.length}/${IDENTITY_ASSETS.length} assets`);

    return NextResponse.json({
      success: true,
      total: identityAssets.length,
      assets: identityAssets,
    });
  } catch (error) {
    console.error('Identity API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch identity assets', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
