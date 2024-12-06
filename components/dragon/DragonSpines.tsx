"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSpineAnimation } from "@/hooks/useSpineAnimation";
import { FormSelector } from "@/components/dragon/FormSelector";
import { GenderSelector } from "@/components/dragon/GenderSelector";
import { StageSelector } from "@/components/dragon/StageSelector";
import {
  getAvailableForms,
  createFormMapping,
  getSelectedFormNumber,
  filterAssetsByFormNumber,
  groupAssetsByGender,
  getCurrentAsset,
} from "@/utils/dragonUtils";
import { DragonMoves } from "@/lib/utils";

interface Asset {
  stage: "hatch" | "hatchling" | "adult";
  path: string;
  form_number: string;
  gender: "m" | "f" | "n";
  color_code: string;
}

interface DragonSpinesProps {
  assets: Asset[];
  egg_img_url: string;
  name: string;
  forms: string[];
}

export default function DragonSpines({
  assets,
  egg_img_url,
  name,
  forms = [],
}: DragonSpinesProps) {
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedForm, setSelectedForm] = useState(forms[0] || "");
  const [selectedGender, setSelectedGender] = useState<"m" | "f" | "n">("f");

  const stages = ["egg", "hatch", "hatchling", "adult"] as const;
  const currentStage = stages[selectedStage];
  const canvasId = `dragon-canvas-${name}`;

  const availableForms = getAvailableForms(forms);
  const formMapping = createFormMapping(availableForms);
  const selectedFormNumber = getSelectedFormNumber(formMapping, selectedForm);
  const currentFormAssets = filterAssetsByFormNumber(
    assets,
    selectedFormNumber
  );
  const genderGroups = groupAssetsByGender(currentFormAssets);
  const currentAsset = getCurrentAsset(
    currentFormAssets,
    currentStage,
    selectedGender
  );

  useSpineAnimation(
    canvasId,
    currentAsset?.path || "",
    DragonMoves.IDLE,
    "profile"
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white/50 rounded-lg p-3 sm:p-4">
        {/* Dragon Display */}
        <div className="relative w-full mx-auto">
          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] mx-auto aspect-square">
            {currentStage === "egg" ? (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={egg_img_url.split("/revision")[0]}
                  alt={`${name} egg`}
                  width={300}
                  height={300}
                  className="w-24 h-24 sm:w-32 sm:h-32 max-w-[300px] mx-auto aspect-square object-contain"
                  priority
                />
              </div>
            ) : (
              <canvas id={canvasId} className="w-full h-full aspect-square" />
            )}
          </div>
        </div>
        {/* Gender Selection */}
        <div className="flex justify-center">
          <GenderSelector
            genders={Object.keys(genderGroups)}
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
          />
        </div>

        {/* Stage Navigation */}
        <StageSelector
          stages={stages}
          selectedStage={selectedStage}
          onStageChange={setSelectedStage}
          textColor="text-bistre/70"
        />

        {/* Form Selection */}
        <FormSelector
          forms={forms}
          selectedForm={selectedForm}
          onFormChange={setSelectedForm}
          textColor="text-bistre/70"
        />

        <div className="flex justify-center mt-2">
          <Link
            href={{
              pathname: currentAsset
                ? `/${name.split(" ").join("_")}/preview`
                : "",
              query: {
                form: selectedForm,
                gender: selectedGender,
                stage: currentStage,
              },
            }}
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full bg-background-dark text-vanilla hover:bg-vanilla/10 hover:text-bistre transition-colors duration-200"
              disabled={!currentAsset}
            >
              Create Preview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
