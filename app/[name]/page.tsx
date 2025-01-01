import { Metadata } from "next";
import DragonSpines from "@/components/dragon/DragonSpines";
import DragonDetails from "@/components/dragon/DragonDetails";
import { Dragon } from "@/utils/types";
import { getDragonData } from "@/utils/api";
import Link from "next/link";
import { defaultmetadata } from "../metadata";

// Define the params type
type Params = {
  name: string;
};

// Define the page props type
type Props = {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const dragon: Dragon = await getDragonData(name);
  const decodedName = decodeURIComponent(dragon.name);

  const metadata: Metadata = {
    ...defaultmetadata,
    title: `${name} | Dragon Egg Gallery`,
    description: `${dragon.egg_description}`,
    openGraph: {
      title: `${name} | Dragon Egg Gallery`,
      description: `${dragon.egg_description}`,
      url: `https://dragon-egg-gallery.vercel.app/${decodedName}`,
    },
    alternates: {
      canonical: `https://dragon-egg-gallery.vercel.app/${decodedName}`,
    },
    verification: {
      google: "0iLmhY0bYkc_cPb4ISSuFwolpoxRU9JFkzarJs4OywI",
    },
    keywords: [...defaultmetadata.keywords as string[], ...dragon.elements, dragon.name, dragon.egg_description, dragon.rarity, dragon.region, dragon.dragon_type, dragon.body_type, dragon.food, ...dragon.forms, ...dragon.special_actions, String(dragon.breeding_tier),String(dragon.tradeable)],
  };
  // console.log(metadata.length);
  return metadata;
}

export default async function DragonPage({ params }: Props) {
  const { name } = await params;
  const dragon: Dragon = await getDragonData(name);
  return (
    <main>
      <div className="max-w-5xl mx-auto">
        {/* Decorative top border */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="w-24 sm:w-32 h-1 bg-vanilla/20 rounded-xl" />
        </div>

        {/* Main content card */}
        <div className="relative p-[2px] rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl bg-gradient-to-r from-vanilla/30 via-vanilla/20 to-vanilla/30">
          <div className="relative bg-[#F3E5AB]/95 rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl p-6">
            {/* Inner border with adjusted positioning and padding */}
            <div className="absolute inset-3 sm:inset-4 border-2 border-bistre/10 rounded-xl pointer-events-none" />

            {/* Corner decorations - hidden on mobile */}
            <div className="hidden sm:block absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-bistre/20 rounded-xl" />
            <div className="hidden sm:block absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-bistre/20 rounded-xl" />
            <div className="hidden sm:block absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-bistre/20 rounded-xl" />
            <div className="hidden sm:block absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-bistre/20 rounded-xl" />

            {/* Content Grid */}
            <div>
              <div className="relative mb-6 sm:mb-4">
                <Link href={`/${name}`}>
                  <h1 className="text-center text-3xl sm:text-4xl font-extrabold font-sans text-bistre/90 capitalize tracking-tight">
                    {decodeURIComponent((await name).replace(/_/g, " "))}
                  </h1>
                </Link>
              </div>
              {/* Title Section */}
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 px-2 sm:px-3">
                <DragonSpines
                  assets={dragon.assets}
                  name={dragon.name}
                  forms={dragon.forms}
                  egg_img_url={dragon.egg_img_url}
                />
                <DragonDetails dragon={dragon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
