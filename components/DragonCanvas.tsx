import { Dragon } from "@/types/dragon";
import { useSpineAnimation } from "@/hooks/useSpineAnimation";
import { useMemo } from "react";

interface DragonCanvasProps {
  egg: Dragon;
  selectedStage: number;
}

export default function DragonCanvas({ egg, selectedStage }: DragonCanvasProps) {
  const canvasId = `dragon-${egg.name}`;
  const stages = ["egg", "hatch", "hatchling", "adult"] as const;
  const currentStage = stages[selectedStage];

  // Move the asset finding logic into useMemo
  const asset = useMemo(() => {
    if (!Array.isArray(egg.assets) || egg.assets.length === 0) {
      console.log(`No assets found for dragon: ${egg.name}`);
      return null;
    }

    return (
      egg.assets.find((a) => a.stage === currentStage) ||
      egg.assets[egg.assets.length - 1]
    );
  }, [egg.assets, currentStage, egg.name]);

  // Call hook unconditionally
  useSpineAnimation(
    canvasId,
    asset?.path || "",
    "idle",
    "card"
  );

  // If no asset is found, render nothing
  if (!asset) {
    return null;
  }

  return <canvas id={canvasId} className="w-full h-full scale-125" />;
}
