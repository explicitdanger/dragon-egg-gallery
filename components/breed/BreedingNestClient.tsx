"use client";

import { useState } from "react";
import { useSpineAnimation } from "@/hooks/useSpineAnimation";
import { Dragon } from "@/types/dragon";
import { DragonCard } from "@/components/breed/DragonCard";

interface BreedingNestClientProps {
  dragons: Dragon[];
}

export default function BreedingNestClient({ dragons }: BreedingNestClientProps) {
  // State for breeder (left side)
  const [breederGender, setBreederGender] = useState<"m" | "f" | "n">("f");
  const [breederDragon, setBreederDragon] = useState(dragons[0]?.name || "");
  const [openBreeder, setOpenBreeder] = useState(false);
  
  // State for target (right side)
  const [targetGender, setTargetGender] = useState<"m" | "f" | "n">("m");
  const [targetDragon, setTargetDragon] = useState(dragons[0]?.name || "");
  const [openTarget, setOpenTarget] = useState(false);

  const BreederCanvasId = "breeder-canvas";
  const TargetCanvasId = "target-canvas";

  useSpineAnimation(
    BreederCanvasId, 
    getCurrentAssetPath(dragons, breederDragon, breederGender), 
    "idle", 
    "card"
  );
  useSpineAnimation(
    TargetCanvasId, 
    getCurrentAssetPath(dragons, targetDragon, targetGender), 
    "idle", 
    "card"
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4">
        <DragonCard
          dragons={dragons}
          selectedDragon={breederDragon}
          selectedGender={breederGender}
          canvasId={BreederCanvasId}
          isOpen={openBreeder}
          onOpenChange={setOpenBreeder}
          onDragonChange={setBreederDragon}
          onGenderChange={setBreederGender}
        />
        <DragonCard
          dragons={dragons}
          selectedDragon={targetDragon}
          selectedGender={targetGender}
          canvasId={TargetCanvasId}
          isOpen={openTarget}
          onOpenChange={setOpenTarget}
          onDragonChange={setTargetDragon}
          onGenderChange={setTargetGender}
        />
      </div>
    </div>
  );
}

// Helper function remains the same
function getCurrentAssetPath(dragons: Dragon[], dragonName: string, gender: "m" | "f" | "n"): string {
  const dragon = dragons.find(d => d.name === dragonName);
  if (!dragon) return "";
  
  const asset = dragon.assets.find(
    a => a.gender === gender && a.stage === "adult"
  );
  return asset?.path || "";
}