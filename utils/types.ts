export interface Personality {
  back: string;
  front: string;
  each?: string;
}

export enum DragonMoves {
  MOVE = "move",
  IDLE = "idle",
  HOLD = "holding",
  TOUCH = "touch",
  NONE = "none",
}

export type SelectedStage = "hatch" | "hatchling" | "adult";

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
  egg_img_url: string;
}

export interface DragonAsset {
  form_number: string;
  gender: "f" | "m" | "n";
  stage: SelectedStage;
  color_code: string;
  path: string;
}
