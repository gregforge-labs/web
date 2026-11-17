import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';

await sharp('public/assets/app-icon.png').resize(96, 96).webp({ quality: 85 }).toFile('public/assets/brand-icon.webp');
await sharp('public/assets/app-icon.png').resize(180, 180).png({ compressionLevel: 9 }).toFile('public/assets/touch-icon.png');
await mkdir('public/assets/fonts', { recursive: true });
await Promise.all(['inter', 'newsreader'].map((font) => copyFile(`node_modules/@fontsource-variable/${font}/LICENSE`, `public/assets/fonts/${font}-LICENSE.txt`)));
console.log('Prepared small brand assets and font license notices.');
