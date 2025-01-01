/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://dragon-egg-gallery.vercel.app',
    changefreq: 'weekly',
    priority: 1,
    generateIndexSitemap: true,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
    },
}