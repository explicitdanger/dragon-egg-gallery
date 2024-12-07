"use client";

import { Dragon } from "@/types/dragon";
import { GenderSelector } from "@/components/dragon/GenderSelector";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

interface DragonCardProps {
  dragons: Dragon[];
  selectedDragon: string;
  selectedGender: "m" | "f" | "n";
  canvasId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDragonChange: (dragon: string) => void;
  onGenderChange: (gender: "m" | "f" | "n") => void;
}

export function DragonCard({
  dragons,
  selectedDragon,
  selectedGender,
  canvasId,
  isOpen,
  onOpenChange,
  onDragonChange,
  onGenderChange,
}: DragonCardProps) {
  return (
    <div className="flex-1 max-w-[17.5rem] sm:max-w-[21rem] md:max-w-[26rem]">
      <Card className="overflow-hidden border-bistre/10 bg-gradient-to-b from-vanilla to-vanilla/95 relative group 
                      h-[25rem] sm:h-[28rem] md:h-[31rem] flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent_80%)]" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-chamoisee/10 rounded-full blur-3xl group-hover:bg-chamoisee/20 transition-all duration-700" />

        <CardHeader className="bg-gradient-to-b from-chamoisee/20 to-chamoisee/5 p-2 sm:p-4 flex-1 min-h-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full aspect-square">
              <canvas id={canvasId} className="w-full h-full" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="bg-gradient-to-b from-chamoisee/5 to-chamoisee/20 backdrop-blur-sm space-y-2 sm:space-y-3 p-2 sm:p-4 flex flex-col">
          <div className="flex justify-center">
            <GenderSelector
              genders={["f", "m"]}
              selectedGender={selectedGender}
              onGenderChange={onGenderChange}
            />
          </div>

          <Popover open={isOpen} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isOpen}
                className="w-full justify-between bg-background-dark text-vanilla hover:bg-vanilla/10 hover:text-bistre border-bistre/20
                          text-xs sm:text-sm h-8 sm:h-10 truncate"
              >
                <span className="truncate">
                  {selectedDragon
                    ? dragons.find((dragon) => dragon.name === selectedDragon)?.name.replace(/_/g, " ")
                    : "Select dragon..."}
                </span>
                <ChevronsUpDown className="ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-background-dark border-bistre/20">
              <Command className="bg-background-dark">
                <CommandInput placeholder="Search dragon..." className="text-vanilla text-xs sm:text-sm" />
                <CommandList>
                  <CommandEmpty className="text-vanilla text-xs sm:text-sm">No dragon found.</CommandEmpty>
                  <CommandGroup className="max-h-[9.375rem] sm:max-h-[12.5rem] overflow-auto">
                    {dragons.map((dragon) => (
                      <CommandItem
                        key={dragon.name}
                        value={dragon.name}
                        onSelect={(currentValue) => {
                          onDragonChange(currentValue === selectedDragon ? "" : currentValue);
                          onOpenChange(false);
                        }}
                        className="text-vanilla hover:bg-vanilla/10 hover:text-bistre aria-selected:bg-vanilla/20
                                  text-xs sm:text-sm py-1.5 sm:py-2"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-3 w-3 sm:h-4 sm:w-4",
                            selectedDragon === dragon.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="truncate">{dragon.name.replace(/_/g, " ")}</span>
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
  );
}