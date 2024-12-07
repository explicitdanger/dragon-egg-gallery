"use client";

import { useState } from "react";
import { useSpineAnimation } from "@/hooks/useSpineAnimation";
import { GenderSelector } from "@/components/dragon/GenderSelector";
import { Dragon } from "@/types/dragon";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BreedingNestClientProps {
  dragons: Dragon[];
}

export default function BreedingNestClient({ dragons }: BreedingNestClientProps) {
    console.log(dragons);
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-start gap-8">
        {/* Left Dragon (Breeder) */}
        <div className="flex-1">
          <Card className="overflow-hidden border-bistre/10 bg-gradient-to-b from-vanilla to-vanilla/95 relative group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent_80%)]" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-chamoisee/10 rounded-full blur-3xl group-hover:bg-chamoisee/20 transition-all duration-700" />

            <CardHeader className="bg-gradient-to-b from-chamoisee/20 to-chamoisee/5 p-4">
              <div className="relative w-full mx-auto">
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] mx-auto aspect-square">
                  <canvas id={BreederCanvasId} className="w-full h-full aspect-square" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 bg-gradient-to-b from-chamoisee/5 to-chamoisee/20 backdrop-blur-sm space-y-4">
              <div className="flex justify-center">
                <GenderSelector
                  genders={["f", "m"]}
                  selectedGender={breederGender}
                  onGenderChange={setBreederGender}
                />
              </div>

              <Popover open={openBreeder} onOpenChange={setOpenBreeder}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openBreeder}
                    className="w-full justify-between bg-background-dark text-vanilla hover:bg-vanilla/10 hover:text-bistre border-bistre/20"
                  >
                    {breederDragon
                      ? dragons.find((dragon) => dragon.name === breederDragon)?.name.replace(/_/g, " ")
                      : "Select dragon..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-background-dark border-bistre/20">
                  <Command className="bg-background-dark">
                    <CommandInput placeholder="Search dragon..." className="text-vanilla" />
                    <CommandList>
                      <CommandEmpty className="text-vanilla">No dragon found.</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-auto">
                        {dragons.map((dragon) => (
                          <CommandItem
                            key={dragon.name}
                            value={dragon.name}
                            onSelect={(currentValue) => {
                              setBreederDragon(currentValue === breederDragon ? "" : currentValue);
                              setOpenBreeder(false);
                            }}
                            className="text-vanilla hover:bg-vanilla/10 hover:text-bistre aria-selected:bg-vanilla/20"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                breederDragon === dragon.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {dragon.name.replace(/_/g, " ")}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </div>

        {/* Right Dragon (Target) */}
        <div className="flex-1">
          <Card className="overflow-hidden border-bistre/10 bg-gradient-to-b from-vanilla to-vanilla/95 relative group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent_80%)]" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-chamoisee/10 rounded-full blur-3xl group-hover:bg-chamoisee/20 transition-all duration-700" />

            <CardHeader className="bg-gradient-to-b from-chamoisee/20 to-chamoisee/5 p-4">
              <div className="relative w-full mx-auto">
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] mx-auto aspect-square">
                  <canvas id={TargetCanvasId} className="w-full h-full aspect-square" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 bg-gradient-to-b from-chamoisee/5 to-chamoisee/20 backdrop-blur-sm space-y-4">
              <div className="flex justify-center">
                <GenderSelector
                  genders={["f", "m"]}
                  selectedGender={targetGender}
                  onGenderChange={setTargetGender}
                />
              </div>

              <Popover open={openTarget} onOpenChange={setOpenTarget}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openTarget}
                    className="w-full justify-between bg-background-dark text-vanilla hover:bg-vanilla/10 hover:text-bistre border-bistre/20"
                  >
                    {targetDragon
                      ? dragons.find((dragon) => dragon.name === targetDragon)?.name.replace(/_/g, " ")
                      : "Select dragon..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-background-dark border-bistre/20">
                  <Command className="bg-background-dark">
                    <CommandInput placeholder="Search dragon..." className="text-vanilla" />
                    <CommandList>
                      <CommandEmpty className="text-vanilla">No dragon found.</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-auto">
                        {dragons.map((dragon) => (
                          <CommandItem
                            key={dragon.name}
                            value={dragon.name}
                            onSelect={(currentValue) => {
                              setTargetDragon(currentValue === targetDragon ? "" : currentValue);
                              setOpenTarget(false);
                            }}
                            className="text-vanilla hover:bg-vanilla/10 hover:text-bistre aria-selected:bg-vanilla/20"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                targetDragon === dragon.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {dragon.name.replace(/_/g, " ")}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper function to get the correct asset path
function getCurrentAssetPath(dragons: Dragon[], dragonName: string, gender: "m" | "f" | "n"): string {
  const dragon = dragons.find(d => d.name === dragonName);
  if (!dragon) return "";
  
  const asset = dragon.assets.find(
    a => a.gender === gender && a.stage === "adult"
  );
  return asset?.path || "";
}