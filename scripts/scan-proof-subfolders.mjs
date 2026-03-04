import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SUBFOLDERS = [
  'studio/proof/317bbq',
  'studio/proof/behr-pet-essentials',
  'studio/proof/circle-city-kicks',
  'studio/proof/clean-aesthetics',
  'studio/proof/herbs-rub',
  'studio/proof/hoosierboy-barber-shop',
  'studio/proof/perpetual-movement-fitness',
  'studio/proof/primary-colours',
  'studio/proof/primarycare-indy',
  'studio/proof/riley-bennett-egloff',
  'studio/proof/school-80-hoa',
  'studio/proof/taco-ninja',
  'studio/proof/tuohy-bailey-moore',
  'studio/proof/urgentcare-indy',
];

// Root-level proof assets (folder = studio/proof exactly)
const ROOT_ASSETS = [
  'Be_Free',
  'Black_Letter_-_Full_Logo',
  'Perpetual_Movement_Coaching-_Primary_Logo_2020',
  'Riley_Bennett_Egloff_logo',
  'be-free-logo',
  'graston_technique_logo',
  'hoosierboy-barber-shop-logo',
  'russell-painting-logo',
  'russell-painting-logo2',
  'thouhy-bailey-and-moore-logo',
  'thouhy-bailey-and-moore-logo2',
  'ultimate_technologies_logo',
];

async function scanFolder(folder) {
  const result = await cloudinary.search
    .expression(`folder="${folder}"`)
    .sort_by('public_id', 'asc')
    .max_results(50)
    .execute();
  return result.resources;
}

async function main() {
  console.log('=== ROOT ASSETS (studio/proof) ===');
  ROOT_ASSETS.forEach(id => console.log(' ', id));

  console.log('\n=== SUBFOLDER ASSETS ===');
  const subfolderMap = {};
  for (const folder of SUBFOLDERS) {
    const slug = folder.split('/').pop();
    const assets = await scanFolder(folder);
    subfolderMap[slug] = assets.map(a => a.public_id);
    console.log(`\n[${slug}] (${assets.length})`);
    assets.forEach(a => console.log('  ', a.public_id));
  }

  // Cross-reference: which root assets appear in subfolders (by filename similarity)?
  console.log('\n=== DUPLICATE CANDIDATES ===');
  const allSubfolderIds = Object.values(subfolderMap).flat().map(id => id.toLowerCase());
  ROOT_ASSETS.forEach(rootId => {
    const rootLower = rootId.toLowerCase().replace(/[-_ ]/g, '');
    const match = allSubfolderIds.find(subId => {
      const subLower = subId.toLowerCase().replace(/[-_ ]/g, '');
      return subLower.includes(rootLower) || rootLower.includes(subLower);
    });
    if (match) {
      console.log(`  ROOT: ${rootId}  <-->  SUBFOLDER: ${match}`);
    } else {
      console.log(`  ROOT: ${rootId}  (no subfolder match)`);
    }
  });
}

main().catch(e => console.error(e.message));
