// Local build policy only. No network calls, domain verification or publication.
export function sitePolicy(env = {}) {
  if (!['preview', 'production'].includes(env.SITE_MODE || 'preview')) throw Error('SITE_MODE must be preview or production')
  const production = env.SITE_MODE === 'production'
  let origin
  if (env.SITE_URL) {
    const u = new URL(env.SITE_URL)
    const host = u.hostname.toLowerCase()
    if (u.protocol !== 'https:' || u.username || u.password || u.port || u.pathname !== '/' || u.search || u.hash || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(host) || /^\d+(\.\d+)+$/.test(host) || /(^|\.)(localhost|local|test|invalid)$/.test(host) || host === 'github.com' || host.endsWith('.github.com') || host === 'github.io' || host.endsWith('.github.io')) throw Error('SITE_URL requires an approved real HTTPS origin, without path, credentials, port, query or hash')
    origin = u.origin
  }
  if (production && !origin) throw Error('Production requires explicit SITE_URL approved by controller')
  return { production, origin }
}
export default function siteMetadata(env) {
  const { production, origin } = sitePolicy(env)
  return {
    name: 'local-site-metadata',
    transformIndexHtml(html) {
      const tags = [{ tag:'meta', attrs:{name:'robots',content:production?'index,follow':'noindex,nofollow'}, injectTo:'head' }]
      if (production) {
        tags.push({tag:'link',attrs:{rel:'canonical',href:origin+'/'},injectTo:'head'})
        tags.push({tag:'meta',attrs:{property:'og:url',content:origin+'/'},injectTo:'head'})
        for (const property of ['og:image','twitter:image']) tags.push({tag:'meta',attrs:property==='og:image'?{property,content:origin+'/social-robert.png'}:{name:property,content:origin+'/social-robert.png'},injectTo:'head'})
      }
      return {html,tags}
    },
    generateBundle() {
      this.emitFile({type:'asset',fileName:'robots.txt',source:production?`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n'})
      if(production) this.emitFile({type:'asset',fileName:'sitemap.xml',source:`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`})
    }
  }
}
