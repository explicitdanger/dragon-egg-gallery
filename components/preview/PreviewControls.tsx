"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAvailableForms,
  createFormMapping,
  getSelectedFormNumber,
  filterAssetsByFormNumber,
  groupAssetsByGender,
  getCurrentAsset,
} from "@/utils/dragonUtils";
import {
  DragonMoves,
  SelectedStage,
  Personality,
  DragonAsset as Asset,
} from "@/utils/types";
import { Combobox } from "@/components/ui/combobox";
import { useSpineAnimation } from "@/hooks/useSpineAnimation";
import { animateAura } from "@/spine/SpineObject";
import { StageSelector } from "../dragon/StageSelector";
import { FormSelector } from "../dragon/FormSelector";
import { GenderSelector } from "../dragon/GenderSelector";
import useBackgroundSpineAnimation from "@/hooks/useBackgroundSpineAnimation";
import useFloorSpineAnimation from "@/hooks/useFloorSpineAnimation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShareDialog } from "@/components/share/ShareDialog";

interface Background {
  display_name: string;
  path: string;
}

interface PreviewControlsProps {
  initialForm: string;
  initialGender: "m" | "f" | "n";
  initialStage: "egg" | SelectedStage;
  forms: string[];
  assets: Asset[];
  name: string;
  floorList: Background[];
  backgroundsList: Background[];
  personalityList: string[];
  personalityJson: Record<string, Personality>;
}

export function PreviewControls({
  initialForm,
  initialGender,
  initialStage,
  forms,
  assets,
  name,
  backgroundsList,
  floorList,
  personalityList,
  personalityJson,
}: PreviewControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stages = ["egg", "hatch", "hatchling", "adult"] as const;

  const [selectedForm, setSelectedForm] = useState<string>(
    searchParams.get("form")
      ? forms.find((f) => f.endsWith(searchParams.get("form") || "")) ||
          initialForm
      : initialForm
  );
  const [selectedGender, setSelectedGender] = useState<"m" | "f" | "n">(
    (searchParams.get("gender") as "m" | "f" | "n") || initialGender
  );
  const [selectedPersonality, setSelectedPersonality] = useState<string>(
    searchParams.get("personality")
      ? personalityList.find((p) =>
          p.startsWith(searchParams.get("personality") || "")
        ) || ""
      : ""
  );
  const [selectedStage, setSelectedStage] = useState<number>(
    Number(searchParams.get("stage")) || stages.indexOf(initialStage)
  );
  const [selectedBackground, setSelectedBackground] = useState<string>(
    searchParams.get("background")
      ? backgroundsList.find((b) =>
          b.path.endsWith(searchParams.get("background") || "")
        )?.path || ""
      : ""
  );
  const [selectedFloor, setSelectedFloor] = useState<string>(
    searchParams.get("floor")
      ? floorList.find((f) => f.path.endsWith(searchParams.get("floor") || ""))
          ?.path || ""
      : ""
  );

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
    stages[selectedStage],
    selectedGender
  );
  const dragonCanvasId = `dragon-canvas-${name}`;
  const backgroundCanvasId = `background-canvas-${name}`;
  const floorCanvasId = `floor-canvas-${name}`;
  const frontAuraCanvasId = `front-aura-canvas-${name}`;
  const backAuraCanvasId = `back-aura-canvas-${name}`;
  const canvasIdArray = [
    backgroundCanvasId,
    floorCanvasId,
    backAuraCanvasId,
    dragonCanvasId,
    frontAuraCanvasId,
  ];

  useSpineAnimation(
    dragonCanvasId,
    currentAsset?.path || "",
    DragonMoves.IDLE,
    "preview"
  );

  useBackgroundSpineAnimation(backgroundCanvasId, selectedBackground);
  useFloorSpineAnimation(floorCanvasId, selectedFloor);

  useEffect(() => {
    if (!selectedPersonality) return;

    const frontCanvas = document.getElementById(
      frontAuraCanvasId
    ) as HTMLCanvasElement;
    const backCanvas = document.getElementById(
      backAuraCanvasId
    ) as HTMLCanvasElement;

    // Cleanup previous animations
    const cleanup = () => {
      // HTMLCanvasElement doesn't have dispose method, so we just need to clear the canvas
      const ctx1 = frontCanvas?.getContext("2d");
      const ctx2 = backCanvas?.getContext("2d");
      ctx1?.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
      ctx2?.clearRect(0, 0, backCanvas.width, backCanvas.height);
    };

    // Animate both auras
    animateAura(
      frontCanvas,
      selectedPersonality,
      "front",
      "preview",
      personalityJson
    );
    animateAura(
      backCanvas,
      selectedPersonality,
      "back",
      "preview",
      personalityJson
    );

    return cleanup;
  }, [
    selectedPersonality,
    frontAuraCanvasId,
    backAuraCanvasId,
    personalityJson,
  ]);

  // Function to update URL
  const updateURL = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  // Update handlers with URL updates
  const handleFormChange = (form: string) => {
    setSelectedForm(form);
    updateURL({ form: form.split("_").pop() || "" });
  };

  const handleGenderChange = (gender: "m" | "f" | "n") => {
    setSelectedGender(gender);
    updateURL({ gender });
  };

  const handleStageChange = (stage: number) => {
    setSelectedStage(stage);
    updateURL({ stage: stage.toString() });
  };

  const handlePersonalityChange = (personality: string) => {
    setSelectedPersonality(personality);
    updateURL({ personality: personality.split("_")[0] });
  };

  const handleBackgroundChange = (background: string) => {
    setSelectedBackground(background);
    updateURL({ background: background.split("/").pop() || "" });
  };

  const handleFloorChange = (floor: string) => {
    setSelectedFloor(floor);
    updateURL({ floor: floor.split("/").pop() || "" });
  };

  // Add URL state
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // Handle URL after mount
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [searchParams]); // Update when searchParams change

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-background-dark/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg border border-vanilla/10">
          {/* Add Share Button */}
          <div className="flex justify-end mb-4">
            {currentUrl && <ShareDialog url={currentUrl} />}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 lg:gap-8">
            {/* Mobile Toggle Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="lg:hidden mb-4 text-vanilla">
                  Open Controls
                </Button>
              </SheetTrigger>
              <SheetContent
                className="bg-background-dark text-vanilla p-6 rounded-lg shadow-lg"
                side="left"
              >
                <SheetTitle className="sr-only">Controls</SheetTitle>
                {/* Left Side - Controls */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex justify-center">
                    <GenderSelector
                      genders={Object.keys(genderGroups)}
                      selectedGender={selectedGender}
                      onGenderChange={handleGenderChange}
                    />
                  </div>
                  <StageSelector
                    stages={stages}
                    selectedStage={selectedStage}
                    onStageChange={handleStageChange}
                    textColor="text-vanilla"
                  />
                  <FormSelector
                    forms={availableForms}
                    selectedForm={selectedForm}
                    onFormChange={handleFormChange}
                  />

                  <div>
                    {personalityList && personalityList.length > 0 ? (
                      <Combobox
                        options={personalityList}
                        value={selectedPersonality}
                        onValueChange={handlePersonalityChange}
                        placeholder="Select personality..."
                        label="Personality"
                        getDisplayValue={(option) => option}
                        getValue={(option) => option}
                      />
                    ) : (
                      <div className="text-vanilla text-sm lg:text-base">
                        Loading personalities...
                      </div>
                    )}
                  </div>

                  <div>
                    {floorList && floorList.length > 0 ? (
                      <Combobox
                        options={floorList}
                        value={selectedFloor}
                        onValueChange={handleFloorChange}
                        placeholder="Select floor..."
                        label="Floor"
                        getDisplayValue={(option) => option.display_name}
                        getValue={(option) => option.path}
                      />
                    ) : (
                      <div className="text-vanilla text-sm lg:text-base">
                        Loading floors...
                      </div>
                    )}
                  </div>

                  <div>
                    {backgroundsList && backgroundsList.length > 0 ? (
                      <Combobox
                        options={backgroundsList}
                        value={selectedBackground}
                        onValueChange={handleBackgroundChange}
                        placeholder="Select background..."
                        label="Background"
                        getDisplayValue={(option) => option.display_name}
                        getValue={(option) => option.path}
                      />
                    ) : (
                      <div className="text-vanilla text-sm lg:text-base">
                        Loading backgrounds...
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Controls - Hidden on Mobile */}
            <div className="hidden lg:block space-y-4 lg:space-y-6">
              <GenderSelector
                genders={Object.keys(genderGroups)}
                selectedGender={selectedGender}
                onGenderChange={handleGenderChange}
              />
              <StageSelector
                stages={stages}
                selectedStage={selectedStage}
                onStageChange={handleStageChange}
                textColor="text-vanilla"
              />
              <FormSelector
                forms={availableForms}
                selectedForm={selectedForm}
                onFormChange={handleFormChange}
              />

              <div>
                {personalityList && personalityList.length > 0 ? (
                  <Combobox
                    options={personalityList}
                    value={selectedPersonality}
                    onValueChange={handlePersonalityChange}
                    placeholder="Select personality..."
                    label="Personality"
                    getDisplayValue={(option) => option}
                    getValue={(option) => option}
                  />
                ) : (
                  <div className="text-vanilla text-sm lg:text-base">
                    Loading personalities...
                  </div>
                )}
              </div>

              <div>
                {floorList && floorList.length > 0 ? (
                  <Combobox
                    options={floorList}
                    value={selectedFloor}
                    onValueChange={handleFloorChange}
                    placeholder="Select floor..."
                    label="Floor"
                    getDisplayValue={(option) => option.display_name}
                    getValue={(option) => option.path}
                  />
                ) : (
                  <div className="text-vanilla text-sm lg:text-base">
                    Loading floors...
                  </div>
                )}
              </div>

              <div>
                {backgroundsList && backgroundsList.length > 0 ? (
                  <Combobox
                    options={backgroundsList}
                    value={selectedBackground}
                    onValueChange={handleBackgroundChange}
                    placeholder="Select background..."
                    label="Background"
                    getDisplayValue={(option) => option.display_name}
                    getValue={(option) => option.path}
                  />
                ) : (
                  <div className="text-vanilla text-sm lg:text-base">
                    Loading backgrounds...
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Canvas */}
            <div className="flex items-center justify-center w-full overflow-x-auto lg:overflow-visible">
              <div className="min-w-[400px]">
                <div className="relative w-[400px] h-[500px] bg-background/5 rounded-lg border-2 border-bistre">
                  {stages[selectedStage] === "egg" ? null : (
                    <>
                      {canvasIdArray.map((canvasId, index) => (
                        <canvas
                          key={index}
                          id={canvasId}
                          className="absolute inset-0 w-full h-full"
                        />
                      ))}
                      <div className="absolute inset-0 w-full h-full" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
