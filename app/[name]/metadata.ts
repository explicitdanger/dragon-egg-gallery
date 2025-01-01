import { getData } from "@/utils/api";
import { defaultmetadata } from "../metadata";
import { formatDragonNameForUrl } from "@/utils/formatters";
import { Metadata } from "next";

export default async function generateMetadata({ params }: { params: { name: string } }) {
  const { name } =  params;
  const dragon = await getData();
  const dragonData = dragon.dragons.find((dragon) => dragon.name === name);
  if (!dragonData) {
    return {
      title: `Dragon Egg Gallery`,
      description: `Dragon Egg Gallery`,
    };
  }
  const metadata: Metadata = {
    ...defaultmetadata,
    title: `${name} | Dragon Egg Gallery`,
    description: `${name} is a dragon egg`,
    openGraph: {
      title: `${name} | Dragon Egg Gallery`,
      description: `${name} is a dragon egg`,
      url: `https://dragon-egg-gallery.vercel.app/${formatDragonNameForUrl(name)}`,
    },
    alternates: {
      canonical: `https://dragon-egg-gallery.vercel.app/${formatDragonNameForUrl(name)}`,
    },
    verification: {
      google: "0iLmhY0bYkc_cPb4ISSuFwolpoxRU9JFkzarJs4OywI",
    },    
  };
  return metadata;
}

