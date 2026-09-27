import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Public pages, for sitemap.xml. Keep in sync with src/routes.ts (not
// imported here: the config is type-checked as its own TS project).
const SITEMAP_PATHS = ['/', '/about', '/for-you', '/learners', '/educators', '/try-now', '/pricing', '/contact']

const FALLBACK_SITE_URL = 'https://link-global-network-website-v1.vercel.app'

// Absolute site URL for link previews (og:url / og:image), canonical, the
// sitemap and robots.txt. Order: an explicit SITE_URL env var, else Vercel's
// VERCEL_PROJECT_PRODUCTION_URL (the project's production domain — it picks
// up a custom domain automatically once one is added), else the vercel.app URL.
function resolveSiteUrl(env: Record<string, string>) {
  const raw = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : FALLBACK_SITE_URL)
  return raw.replace(/\/+$/, '')
}

function seoFiles(siteUrl: string, isProduction: boolean): Plugin {
  return {
    name: 'lg-seo-files',
    // index.html uses %SITE_URL% placeholders.
    transformIndexHtml: (html) => html.replace(/%SITE_URL%/g, siteUrl),
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = SITEMAP_PATHS.map(
        (p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`,
      ).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      // Preview deployments must never be indexed; production can be.
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: isProduction
          ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
          : 'User-agent: *\nDisallow: /\n',
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // '' prefix = every env var, including Vercel's system variables.
  const env = loadEnv(mode, '.', '')
  const siteUrl = resolveSiteUrl(env)
  // Outside Vercel (VERCEL_ENV unset) treat the build as production.
  const isProduction = !env.VERCEL_ENV || env.VERCEL_ENV === 'production'

  return {
    plugins: [react(), seoFiles(siteUrl, isProduction)],
    resolve: {
      // react-globe.gl pulls in its own nested copy of three.js, which otherwise
      // loads alongside any top-level copy and breaks at runtime (e.g. Matrix4
      // instances from one copy aren't recognized by the other). Force every
      // import of 'three' to resolve to a single instance.
      dedupe: ['three'],
    },
  }
})
