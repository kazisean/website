#!/usr/bin/env node
/*
 * Fetch link-hover preview assets (screenshot + metadata) for every
 * `data-preview="<url>"` link found in layouts/index.html.
 *
 * One Microlink API call per URL. Results are downloaded to
 * static/previews/ and described in static/previews/previews.json so the
 * live site never makes an external request (hovers read the committed
 * JSON + PNGs).
 *
 * Idempotent: URLs whose screenshot PNG already exists are skipped, so
 * re-running the script does not burn API quota. Pass --refresh to force
 * re-fetch every URL (e.g. when a target site changes).
 *
 * Usage:
 *   node scripts/fetch-previews.js            # fetch only missing previews
 *   node scripts/fetch-previews.js --refresh  # re-fetch every preview
 *
 * Requires Node >= 18 (uses the global fetch). No npm dependencies.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const INDEX_HTML = path.join(REPO_ROOT, 'layouts', 'index.html');
const PREVIEWS_DIR = path.join(REPO_ROOT, 'static', 'previews');
const MANIFEST_PATH = path.join(PREVIEWS_DIR, 'previews.json');

const MICROLINK_ENDPOINT = 'https://api.microlink.io/';

const FORCE_REFRESH = process.argv.includes('--refresh');

// Find every data-preview="<url>" attribute in the homepage layout and
// return the unique URLs. This makes layouts/index.html the single source
// of truth — adding a preview to a new link means tagging it there and
// re-running this script.
function collectPreviewUrls() {
  const html = fs.readFileSync(INDEX_HTML, 'utf8');
  const matches = [...html.matchAll(/data-preview="([^"]+)"/g)];
  // Only keep real absolute http(s) URLs — the regex also matches the
  // placeholder in the CSS comment ("data-preview=\"<url>\""), which would
  // otherwise be sent to Microlink and abort the run with HTTP 400.
  const urls = matches
    .map((m) => m[1])
    .filter((u) => /^https?:\/\//i.test(u));
  return [...new Set(urls)];
}

// Turn a URL into a safe, human-readable filename, e.g.
// "https://cs.nyu.edu/" -> "cs-nyu-edu.png"
function slugFromUrl(url) {
  const stripped = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return stripped.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
}

// Ask Microlink for a screenshot + metadata for one URL. Returns the JSON
// payload (data.screenshot.url, data.title, data.description, data.logo).
async function fetchPreviewFromMicrolink(url) {
  const apiUrl = new URL(MICROLINK_ENDPOINT);
  apiUrl.searchParams.set('url', url);
  apiUrl.searchParams.set('screenshot', 'true');
  apiUrl.searchParams.set('waitUntil', 'networkidle0');
  apiUrl.searchParams.set('waitForTimeout', '5000');
  apiUrl.searchParams.set('timeout', '30s');

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Microlink returned HTTP ${response.status} for ${url}`);
  }
  const json = await response.json();

  if (json.status !== 'success' || !json.data || !json.data.screenshot) {
    throw new Error(`Microlink did not return a screenshot for ${url}: ${JSON.stringify(json)}`);
  }
  return json.data;
}

// Download a remote image (the Microlink-hosted screenshot) to a local file.
async function downloadImage(imageUrl, destPath) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download ${imageUrl}: HTTP ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
}

// Build (or rebuild) the manifest map from any previews.json that already
// exists, so re-runs preserve entries for URLs we are skipping this time.
function loadExistingManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return {};
  }
}

async function main() {
  const urls = collectPreviewUrls();
  if (urls.length === 0) {
    console.log('No data-preview links found in layouts/index.html. Nothing to do.');
    return;
  }

  fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
  const manifest = loadExistingManifest();

  for (const url of urls) {
    const slug = slugFromUrl(url);
    const pngPath = path.join(PREVIEWS_DIR, `${slug}.png`);
    const pngRelative = `/previews/${slug}.png`;

    const alreadyDownloaded = fs.existsSync(pngPath);
    if (alreadyDownloaded && !FORCE_REFRESH) {
      console.log(`Skipping (already fetched): ${url}`);
      if (!manifest[url]) {
        // The PNG exists but the manifest entry is missing — record a minimal
        // entry pointing at the local PNG so the homepage script can find it.
        manifest[url] = { screenshot: pngRelative };
      }
      continue;
    }

    console.log(`Fetching preview: ${url}`);
    const data = await fetchPreviewFromMicrolink(url);
    await downloadImage(data.screenshot.url, pngPath);

    manifest[url] = {
      title: data.title || null,
      description: data.description || null,
      logo: data.logo ? data.logo.url : null,
      screenshot: pngRelative,
    };
    console.log(`  -> wrote ${pngPath}`);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote manifest: ${MANIFEST_PATH} (${Object.keys(manifest).length} entries)`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});