import { getData } from "@/utils/api";
import { formatDragonNameForUrl } from "@/utils/formatters";

export default async function Sitemap() {
  const dragons = await getData();
  const dragonUrls = dragons.dragons.map((dragon) => ({
    url: `https://dragon-egg-gallery.vercel.app/${formatDragonNameForUrl(dragon.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    images: [dragon.egg_img_url],
  }));

  const previewUrls = dragons.dragons.map((dragon) => {
    // Get the first available form
    const gender = dragon.assets[0]?.gender || "f";
    const form = dragon.forms[0] || "default";

    return {
      url: `https://dragon-egg-gallery.vercel.app/${formatDragonNameForUrl(dragon.name)}/preview?form=${form}&amp;gender=${gender}&amp;stage=1`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [dragon.egg_img_url],
    };
  });

  const routes = [
    {
      url: "https://dragon-egg-gallery.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...dragonUrls,
    ...previewUrls,
  ];
  console.log(routes.length);

  return [...routes];
}
