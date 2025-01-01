import { defaultmetadata } from "@/app/metadata";
import { PreviewControls } from "@/components/preview/PreviewControls";
import {
  getDragonData,
  getBackgroundsList,
  getFloorList,
  getPersonalityJson,
} from "@/utils/api";
import { Dragon, SelectedStage } from "@/utils/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface PreviewPageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{
    form: Promise<string>;
    gender: Promise<"m" | "f" | "n">;
    stage: Promise<"egg" | SelectedStage>;
  }>;
}


export async function generateMetadata({ params, searchParams }: PreviewPageProps) {
  const { name } = await params;
  const { form, gender, stage } = await searchParams;
  const dragon: Dragon = await getDragonData(name);
  // const decodedName = decodeURIComponent(dragon.name);
  let mappedStage = "";
  switch (await stage as string) {
    case "0":
      mappedStage = "egg";
      break;
    case "1":
      mappedStage = "hatch";
      break;
    case "2":
      mappedStage = "hatchling";
      break;
    case "3":
      mappedStage = "adult";
      break;
    default:
      break;
  }
  const metadata: Metadata = {
    ...defaultmetadata,
    title: ` ${mappedStage} ${form} ${dragon.name} Preview`,
    description: `${dragon.egg_description}`,
    keywords: [...defaultmetadata.keywords as string[], ...dragon.elements, dragon.name, dragon.egg_description, dragon.rarity, dragon.region, dragon.dragon_type, dragon.body_type, dragon.food, ...dragon.forms, ...dragon.special_actions, String(dragon.breeding_tier), String(dragon.tradeable), String(form), String(gender), String(stage)],
    openGraph: {
      title: ` ${mappedStage} ${await form === "default" ? "" : form} ${dragon.name} Preview`,
      description: `${dragon.egg_description}`,
      url: `https://dragon-egg-gallery.vercel.app/${name}/preview?form=${form}&gender=${gender}&stage=${stage}`,
    },
    alternates: {
      canonical: `https://dragon-egg-gallery.vercel.app/${name}/preview?form=${form}&gender=${gender}&stage=${stage}`,
    },
    verification: {
      google: "0iLmhY0bYkc_cPb4ISSuFwolpoxRU9JFkzarJs4OywI",
    },
  };
  return metadata;
}

export default async function PreviewPage({ params, searchParams }: PreviewPageProps) {
  const { name } = await params;
  const { form, gender, stage } = await searchParams;

  if (!form || !gender || !stage) {
    redirect(`/${name}`);
  }

  // Fetch dragon data here
  const dragon = await getDragonData(name);
  const backgroundsList = await getBackgroundsList();
  const floorList = await getFloorList();
  const personalityJson = await getPersonalityJson();

  return (
    <PreviewControls
      name={dragon.name}
      initialForm={form as unknown as string}
      initialGender={gender as unknown as "m" | "f" | "n"}
      initialStage={stage as unknown as "egg" | SelectedStage}
      forms={dragon.forms}
      assets={dragon.assets}
      backgroundsList={backgroundsList}
      floorList={floorList}
      personalityList={Object.keys(personalityJson)}
      personalityJson={personalityJson}
    />
  );
}
