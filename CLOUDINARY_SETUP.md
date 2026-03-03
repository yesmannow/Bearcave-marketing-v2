# Cloudinary Setup Guide for Visual Uplink Studio

## Environment Variables

Add the following variables to your `.env.local` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important:**
- These variables are **server-side only** (no `NEXT_PUBLIC_` prefix)
- The API secret is never exposed to the client
- All Cloudinary operations happen through the `/api/gallery` route

## Getting Your Cloudinary Credentials

1. **Sign up or log in** to [Cloudinary](https://cloudinary.com/)
2. Navigate to your **Dashboard**
3. Find your credentials in the **Account Details** section:
   - **Cloud Name**: Your unique Cloudinary identifier
   - **API Key**: Public key for API access
   - **API Secret**: Private key (keep this secure, server-side only)

## Folder Structure in Cloudinary

The Visual Uplink Studio expects the following folder structure in your Cloudinary Media Library:

```
studio/
├── photography/       # Photography artifacts
├── graphic-design/    # Design work and visual identity
└── proof/            # Technical proof and system demonstrations
```

## Upload Preset Configuration (Optional)

For optimal performance, configure an upload preset named `studio_artifact_preset`:

1. Go to **Settings** → **Upload** → **Upload presets**
2. Create a new preset with these settings:
   - **Preset name**: `studio_artifact_preset`
   - **Signing mode**: Unsigned (or Signed if you prefer)
   - **Folder**: Leave empty (will be specified during upload)
   - **Unique filename**: `false`
   - **Overwrite**: `true`
   - **Auto tagging**: Enable for better organization
   - **Context**: Enable to add custom metadata (alt text, captions)

## Mixed-Media Support (Images + Videos)

The Visual Uplink Studio supports both **images** and **videos** in all categories:

**Supported Formats:**
- **Images**: JPG, PNG, WebP, GIF, SVG
- **Videos**: MP4, WebM, MOV (automatically optimized with `f_auto,q_auto`)

**Video Features:**
- Automatic CDN optimization for bandwidth efficiency
- Duration badges displayed in MM:SS format
- Teal glow border on hover for visual distinction
- Muted autoplay with loop and playsInline attributes

## Adding Metadata to Resources

To display captions and alt text in the gallery:

1. Select a resource in your Media Library
2. Click **Edit** → **Context**
3. Add custom fields:
   - `alt`: Alternative text for accessibility and SEO
   - `caption`: Display caption (shows on hover)

Example:

```json
{
  "custom": {
    "alt": "Brand identity system for tech startup",
    "caption": "Visual language exploration — 2024"
  }
}
```

## AI-Driven Filename Sanitization

The system automatically sanitizes unstructured filenames for professional display:

**Unstructured Patterns Detected:**
- `IMG_`, `VID_`, `PSX_`, `DSC_`, `DCIM_`, `MVI_`, `MOV_`, `PXL_`
- `Adobe_Post` prefixes
- Date-based filenames (e.g., `2021-05-28-004910673.mp4`)

**Automatic Fallbacks:**
- Videos: "Motion Study"
- Images: "System Artifact"
- Custom captions always take priority

## Bulk Cleanup Script

For renaming large batches of unstructured files from Google Drive sync:

**Dry Run (Preview Changes):**
```bash
npm run cleanup:dry-run
```

**Execute Renames:**
```bash
npm run cleanup:execute
```

**Safety Features:**
- Dry-run mode by default (no changes made)
- 3-second countdown before execution
- Detailed logging of all operations
- Automatic sequential naming (e.g., `photography-artifact-01`, `design-motion-02`)

**Example Output:**
```
📋 DRY RUN MODE - No changes will be made

🔍 Scanning folder: studio/graphic-design
   Found 15 resources

📊 PROPOSED CHANGES:

1. VIDEO
   Reason: Unstructured filename: 2021-05-28-004910673.mp4
   Old: studio/graphic-design/2021-05-28-004910673
   New: studio/graphic-design/graphic-design-motion-01

📈 SUMMARY: 12 files will be renamed
   Images: 8
   Videos: 4
```

## Testing the Integration

1. Ensure your `.env.local` is configured with valid credentials
2. Upload at least one image to each category folder
3. Start the development server: `npm run dev`
4. Navigate to `/studio`
5. Toggle between categories to verify the API integration

## Security Notes

- **Never commit** `.env.local` to version control
- The API secret remains **server-side only** (handled by Next.js API routes)
- All client requests go through `/api/gallery` which securely communicates with Cloudinary

## Troubleshooting

**"Cloudinary credentials not configured" error:**
- Verify `.env.local` exists in the project root
- Check that all three environment variables are set
- Restart the dev server after adding/modifying `.env.local`

**"No artifacts found" message:**
- Confirm images exist in the correct folder paths
- Check folder names match exactly: `studio/photography`, `studio/graphic-design`, `studio/proof`
- Verify images are uploaded successfully in Cloudinary Media Library

**Images not loading:**
- Check browser console for CORS or network errors
- Verify the `secure_url` is accessible
- Ensure your Cloudinary account is active
