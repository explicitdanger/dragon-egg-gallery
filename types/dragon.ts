export interface Dragon {
  name: string;
  egg_description: string;
  elements: string[];
  rarity: string;
  region: string;
  dragon_type: string;
  body_type: string;
  food: string;
  tradeable: boolean;
  breeding_tier: number;
  forms: string[];
  assets: DragonAsset[];
  special_actions: string[];
  egg_img_url:string
}

interface DragonAsset {
  form_number: string;
  gender: "f" | "m" | "n";
  stage: "hatch" | "hatchling" | "adult";
  color_code: string;
  path: string;
}
