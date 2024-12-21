"use client";

import { useState, useMemo } from "react";
import { useSpineAnimation } from "@/hooks/useSpineAnimation";
import { Dragon } from "@/utils/types";
import { DragonCard } from "@/components/breed/DragonCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface BreedingNestClientProps {
  dragons: Dragon[];
}

interface DragonProbability {
  probability: string;
  name: string;
  eggUrl: string;
}

type DragonStatus = "none" | "poison" | "love";

function calculateBreedingProbability(
  dragon1: Dragon, 
  dragon2: Dragon,
  multiplier1: number = 1,
  multiplier2: number = 1
): DragonProbability[] {
  const tierWeights = {
    0: 10,
    0.5: 15,
    1: 25,
    2: 45,
    3: 70,
    4: 100,
    4.5: 500,
    5: 1000,
    "Insect Queen": 0
  };

  let weight1 = tierWeights[dragon1.breeding_tier as keyof typeof tierWeights] || 0;
  let weight2 = tierWeights[dragon2.breeding_tier as keyof typeof tierWeights] || 0;

  // Apply multipliers
  weight1 *= multiplier1;
  weight2 *= multiplier2;

  const dragon1EggUrl = dragon1.egg_img_url.split("/revision/")[0];
  const dragon2EggUrl = dragon2.egg_img_url.split("/revision/")[0];

  // Special case for Insect Queen
  if (weight1 === 0 && dragon1.name === "Insect Queen") {
    return [{ probability: "100.00%", name: dragon2.name, eggUrl: dragon2EggUrl }];
  }
  if (weight2 === 0 && dragon2.name === "Insect Queen") {
    return [{ probability: "100.00%", name: dragon1.name, eggUrl: dragon1EggUrl }];
  }

  const totalWeight = weight1 + weight2;
  
  if (totalWeight === 0) {
    return [];
  }

  const prob1 = (weight1 / totalWeight) * 100;
  const prob2 = (weight2 / totalWeight) * 100;

  return [
    { probability: `${prob1.toFixed(2)}%`, name: dragon1.name, eggUrl: dragon1EggUrl },
    { probability: `${prob2.toFixed(2)}%`, name: dragon2.name, eggUrl: dragon2EggUrl }
  ];
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

  // Add status states
  const [breederStatus, setBreederStatus] = useState<DragonStatus>("none");
  const [targetStatus, setTargetStatus] = useState<DragonStatus>("none");

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

  const breedingProbabilities = useMemo(() => {
    const breederDragonObj = dragons.find(d => d.name === breederDragon);
    const targetDragonObj = dragons.find(d => d.name === targetDragon);
    
    if (!breederDragonObj || !targetDragonObj) return [];
    
    // Apply status effects to weights
    const getStatusMultiplier = (status: DragonStatus) => {
      switch (status) {
        case "poison": return 0.66;
        case "love": return 1.5;
        default: return 1;
      }
    };

    const breederMultiplier = getStatusMultiplier(breederStatus);
    const targetMultiplier = getStatusMultiplier(targetStatus);
    
    return calculateBreedingProbability(
      breederDragonObj, 
      targetDragonObj,
      breederMultiplier,
      targetMultiplier
    );
  }, [dragons, breederDragon, targetDragon, breederStatus, targetStatus]);

  // Status selector component
  const StatusSelector = ({ value, onChange }: { 
    value: DragonStatus; 
    onChange: (value: DragonStatus) => void;
  }) => (
    <Tabs value={value} onValueChange={(v) => onChange(v as DragonStatus)} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-background-dark/20">
        <TabsTrigger 
          value="none"
          className="data-[state=active]:bg-vanilla data-[state=active]:text-bistre text-vanilla"
        >
          None
        </TabsTrigger>
        <TabsTrigger 
          value="poison"
          className="data-[state=active]:bg-vanilla data-[state=active]:text-bistre text-vanilla"
        >
          Poison
        </TabsTrigger>
        <TabsTrigger 
          value="love"
          className="data-[state=active]:bg-vanilla data-[state=active]:text-bistre text-vanilla"
        >
          Love
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4">
        {/* Left Dragon Card with Status */}
        <div className="space-y-2">
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
          <StatusSelector value={breederStatus} onChange={setBreederStatus} />
        </div>

        {/* Right Dragon Card with Status */}
        <div className="space-y-2">
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
          <StatusSelector value={targetStatus} onChange={setTargetStatus} />
        </div>
      </div>

      {/* Probabilities display remains the same */}
      {breedingProbabilities.length > 0 && (
        <div className="flex justify-center items-center gap-12">
          {breedingProbabilities.map((prob, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 relative">
                <Image
                  src={prob.eggUrl}
                  alt={`${prob.name} egg`}
                  className="w-full h-full object-contain"
                  title={prob.name.replace(/_/g, " ")}
                />
              </div>
              <span className="text-2xl font-semibold text-vanilla">
                {prob.probability}
              </span>
            </div>
          ))}
        </div>
      )}
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