export const generateSitemap = (baseUrl: string) => {
  const routes = [
    '',
    '/layanan/sedot-wc',
    '/layanan/sedot-septic-tank',
    '/layanan/wc-mampet',
    '/layanan/septic-tank-penuh',
    '/layanan/penyedotan-limbah',
    '/kontak'
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return sitemap;
};
