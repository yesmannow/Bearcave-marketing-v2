export interface CloudinaryResource {
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: 'image' | 'video' | 'raw' | 'auto';
  created_at: string;
  bytes: number;
  url: string;
  secure_url: string;
  folder?: string;
  filename?: string;
  duration?: number;
  tags?: string[];
  context?: {
    custom?: {
      alt?: string;
      caption?: string;
      [key: string]: string | undefined;
    };
  };
  colors?: Array<[string, number]>;
  asset_folder?: string;
}

export interface MixedMediaResource {
  public_id: string;
  resource_type: 'image' | 'video';
  format: string;
  width: number;
  height: number;
  secure_url: string;
  duration?: number;
  display_name?: string;
  blurDataURL?: string;
  tags?: string[];
  workId?: string;
  relatedWorkUrl?: string;
  projectSlug?: string;
  isAnchor?: boolean;
  identityRole?: 'hero' | 'resume' | 'signature' | 'parallax';
  identityPage?: string;
  context?: {
    custom?: {
      alt?: string;
      caption?: string;
      [key: string]: string | undefined;
    };
  };
  colors?: Array<[string, number]>;
}

export interface CloudinarySearchResponse {
  total_count: number;
  resources: CloudinaryResource[];
  next_cursor?: string;
}

export type GalleryCategory = 'photography' | 'graphic-design' | 'proof';

export const CATEGORY_FOLDERS: Record<GalleryCategory, string> = {
  'photography': 'studio/photography',
  'graphic-design': 'studio/graphic-design',
  'proof': 'studio/proof',
};
