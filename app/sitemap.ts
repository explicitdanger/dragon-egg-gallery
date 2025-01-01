import { getData } from "@/utils/api";
import { formatDragonNameForUrl } from "@/utils/formatters";
export default async function Sitemap() {
  const dragons = await getData();
  const dragonUrls = dragons.dragons.map((dragon) => ({
    url: `https://dragon-egg-gallery.vercel.app/${formatDragonNameForUrl(dragon.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const routes = [
    {
      url: "https://dragon-egg-gallery.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...dragonUrls,
  ];
  console.log(routes.length);

  return [...routes];
}
