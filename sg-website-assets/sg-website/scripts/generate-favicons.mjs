import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')
const source = resolve(publicDir, 'web-app-manifest-512x512.png')

const sizes = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192.png', size: 192 },
  { name: 'android-chrome-512.png', size: 512 },
]

for (const { name, size } of sizes) {
  await sharp(source)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, name))
  console.log(`  wrote ${name} (${size}x${size})`)
}

// Generate favicon.ico from 16 and 32 PNGs
const ico = await pngToIco([
  resolve(publicDir, 'favicon-16.png'),
  resolve(publicDir, 'favicon-32.png'),
])
await writeFile(resolve(publicDir, 'favicon.ico'), ico)
console.log('  wrote favicon.ico (16+32)')

console.log('Done.')
