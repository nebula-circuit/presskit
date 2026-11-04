import { existsSync } from 'node:fs'
import { copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { zipSync, type Zippable } from 'fflate'
import media from '../app/content/media.json'

/** Final touches on `build/client` so it can be uploaded to GitHub Pages as-is */
export async function postBuild(clientDir: string, basename: string) {
  await flattenBasename(clientDir, basename)
  await buildZips(clientDir)
}

/**
 * Prerendered pages are written under `client/<basename>/`, but GitHub Pages already serves
 * `client/` at the basename. Move them up and keep the SPA fallback as the 404 page, so unknown
 * paths still hydrate and render the app's not-found screen.
 */
async function flattenBasename(clientDir: string, basename: string) {
  const fallback = path.join(clientDir, '__spa-fallback.html')
  const nested = path.join(clientDir, basename)

  if (basename === '/' || !existsSync(nested)) {
    if (existsSync(fallback)) await copyFile(fallback, path.join(clientDir, '404.html'))
    return
  }

  // With a basename, the SPA fallback is emitted as the root index.html
  await rename(path.join(clientDir, 'index.html'), path.join(clientDir, '404.html'))
  for (const entry of await readdir(nested)) {
    await rename(path.join(nested, entry), path.join(clientDir, entry))
  }
  await rm(nested, { recursive: true })
}

/**
 * Packs the hi-res press photos/videos into the ZIPs the download buttons point at, so visitors
 * download a static file instead of zipping in the browser.
 */
async function buildZips(clientDir: string) {
  for (const { dir, file, files, keepSources } of Object.values(media.downloads)) {
    const entries: Zippable = {}
    for (const name of files) {
      // level 0: JPG/MP4 are already compressed, storing is faster and the same size
      entries[name] = [await readFile(path.join(clientDir, dir, name)), { level: 0 }]
    }

    const dest = path.join(clientDir, file)
    await mkdir(path.dirname(dest), { recursive: true })
    await writeFile(dest, zipSync(entries))

    // Sources only linked from the ZIP don't need to be deployed twice
    if (!keepSources) await rm(path.join(clientDir, dir), { recursive: true })
  }
}
