import { clsx, type ClassValue } from "clsx";
import { notFound } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum DragonMoves {
  MOVE = "move",
  IDLE = "idle",
  HOLD = "holding",
  TOUCH = "touch",
  NONE = "none",
}

export type SelectedStage = "hatch" | "hatchling" | "adult";

export async function getDragonData(name: string) {
  try {
    const resp = await fetch(
      `https://raw.githubusercontent.com/explicitdanger/eggs-db/refs/heads/main/dragons/${name.toLowerCase()}.json`,
      { next: { revalidate: 3600 } }
    );

    if (!resp.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await resp.json();

    if (!data) {
      notFound();
    }

    return data;
  } catch (error) {
    console.error("Error fetching dragon data:", error);
    notFound();
  }
}

export async function getBackgroundsList() {
  try {
    const resp = await fetch(
      "https://raw.githubusercontent.com/explicitdanger/eggs-db/refs/heads/main/bg_assets.json",
      { next: { revalidate: 3600 } }
    );
    const { bg } = await resp.json();
    return bg;
  } catch (error) {
    console.error("Error fetching backgrounds list:", error);
    return [];
  }
}
export async function getFloorList() {
  try {
    const resp = await fetch(
      "https://raw.githubusercontent.com/explicitdanger/eggs-db/refs/heads/main/floor_assets.json",
      { next: { revalidate: 3600 } }
    );
    const { floor } = await resp.json();
    return floor;
  } catch (error) {
    console.error("Error fetching floor list:", error);
    return [];
  }
}