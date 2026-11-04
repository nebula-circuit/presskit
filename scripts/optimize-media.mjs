// Generates the web-sized media the site serves and writes `app/content/media.json`.
// Run with `pnpm media` after adding or replacing photos/videos, then commit the output.
// Sources: high-res JPGs in public/assets/download-img and MP4s in public/assets/video.
import { execFileSync } from 'node:child_process'
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const ASSETS = 'assets'

const GALLERY_WIDTHS = [480, 960, 1600]
const HERO_WIDTHS = [640, 1024, 1300]
const WEBP = { quality: 72, effort: 5 }

// Crop of photo 4 framing the live performance (same shot the old hero zoomed into)
const HERO_SOURCE = 'nebula-circuit-4.jpg'
const HERO_CROP = { left: 850, top: 1900, width: 1300, height: 1040 }
const OG_CROP = { left: 340, top: 1800, width: 2340, height: 1229 }

const out = (...p) => path.join(PUBLIC, ASSETS, ...p)
const rel = (...p) => [ASSETS, ...p].join('/')

async function oriented(file) {
  // Some JPGs are stored landscape with an EXIF rotation; bake it in first
  return sharp(await sharp(file).rotate().toBuffer())
}

async function variants(img, dir, name, widths) {
  const { width: srcWidth } = await img.metadata()
  const sizes = widths
    .filter((w) => w < srcWidth)
    .concat(srcWidth > widths.at(-1) ? [] : [srcWidth])
  for (const w of sizes) {
    await img
      .clone()
      .resize({ width: w })
      .webp(WEBP)
      .toFile(out(dir, `${name}-${w}.webp`))
  }
  return sizes
}

async function gallery() {
  await mkdir(out('img', 'gallery'), { recursive: true })
  const files = (await readdir(out('download-img')))
    .filter((f) => /^nebula-circuit-\d+\.jpe?g$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))

  const items = []
  for (const file of files) {
    const id = file.match(/\d+/)[0]
    const img = await oriented(out('download-img', file))
    const { width, height } = await img.metadata()
    const widths = await variants(img, 'img/gallery', id, GALLERY_WIDTHS)
    items.push({
      id,
      width,
      height,
      widths,
      base: rel('img', 'gallery', id),
      hq: rel('download-img', file),
    })
  }
  return items
}

async function hero() {
  const img = (await oriented(out('download-img', HERO_SOURCE))).extract(HERO_CROP)
  const cropped = sharp(await img.toBuffer())
  const widths = await variants(cropped, 'img', 'hero', HERO_WIDTHS)

  const og = (await oriented(out('download-img', HERO_SOURCE))).extract(OG_CROP)
  await og
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(out('img', 'og.jpg'))

  return { width: HERO_CROP.width, height: HERO_CROP.height, widths, base: rel('img', 'hero') }
}

async function videos() {
  const files = (await readdir(out('video'))).filter((f) => f.endsWith('.mp4')).sort()
  const items = []
  for (const file of files) {
    const src = out('video', file)
    const png = execFileSync('ffmpeg', [
      '-loglevel',
      'error',
      '-ss',
      '1',
      '-i',
      src,
      '-frames:v',
      '1',
      '-f',
      'image2pipe',
      '-vcodec',
      'png',
      '-',
    ])
    const poster = file.replace(/\.mp4$/, '.webp')
    const img = sharp(png)
    const { width, height } = await img.metadata()
    await img.webp(WEBP).toFile(out('video', poster))
    items.push({ src: rel('video', file), poster: rel('video', poster), width, height })
  }
  return items
}

async function images(names) {
  const entries = await Promise.all(
    names.map(async (name) => {
      const { width, height } = await sharp(out('img', name)).metadata()
      return [name.replace(/\.\w+$/, ''), { src: rel('img', name), width, height }]
    })
  )
  return Object.fromEntries(entries)
}

// design/icon-n.png has a fake-transparency checkerboard baked in (no alpha channel).
// Key it out by saturation: the logo is saturated cyan/magenta, the checkerboard is gray.
async function keyedLogo() {
  const { data, info } = await sharp(path.join(ROOT, 'design', 'icon-n.png'))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const rgba = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
    const a = Math.min(1, (Math.max(r, g, b) - Math.min(r, g, b)) / 170)
    // Un-mix the light background from antialiased edges
    const unmix = (c) => (a > 0 ? Math.max(0, Math.min(255, (c - (1 - a) * 255) / a)) : 0)
    rgba[j] = unmix(r)
    rgba[j + 1] = unmix(g)
    rgba[j + 2] = unmix(b)
    rgba[j + 3] = Math.round(a * 255)
  }
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .png()
    .toBuffer()
}

async function icons() {
  const logo = await keyedLogo()
  const icon = async (size, file, scale = 0.62) => {
    const inner = Math.round(size * scale)
    const mark = await sharp(logo).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer()
    await sharp({ create: { width: size, height: size, channels: 4, background: '#0a0b0f' } })
      .composite([{ input: mark, gravity: 'center' }])
      .png({ palette: true, compressionLevel: 9 })
      .toFile(path.join(PUBLIC, file))
  }
  await icon(32, 'favicon-32.png', 0.8)
  await icon(64, 'favicon-64.png', 0.8)
  await icon(180, 'apple-touch-icon.png')
  await icon(512, 'icon-512.png')
}

async function folderBytes(dir) {
  const files = await readdir(out(dir))
  const sizes = await Promise.all(files.map(async (f) => (await stat(out(dir, f))).size))
  return { files: files.sort(), bytes: sizes.reduce((a, b) => a + b, 0) }
}

const media = {
  hero: await hero(),
  gallery: await gallery(),
  videos: await videos(),
  images: await images([
    'live-setup-diagram.webp',
    'cold-stream.webp',
    'synthetic-resistance.webp',
    'talisman.webp',
    'scars-on-a-digital-mind.webp',
  ]),
  downloads: {
    photos: {
      file: 'downloads/nebula-circuit-press-photos.zip',
      dir: rel('download-img'),
      // Each photo is also linked individually from the gallery
      keepSources: true,
      ...(await folderBytes('download-img')),
    },
    videos: {
      file: 'downloads/nebula-circuit-press-videos.zip',
      dir: rel('download-video'),
      keepSources: false,
      ...(await folderBytes('download-video')),
    },
  },
}
await icons()

await writeFile(
  path.join(ROOT, 'app', 'content', 'media.json'),
  JSON.stringify(media, null, 2) + '\n'
)
console.log('media.json written:', media.gallery.length, 'photos,', media.videos.length, 'videos')
