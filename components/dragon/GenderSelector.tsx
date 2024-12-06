"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GenderSelectorProps {
  genders: string[];
  selectedGender: "m" | "f" | "n";
  onGenderChange: (gender: "m" | "f" | "n") => void;
}

export function GenderSelector({ genders, selectedGender, onGenderChange }: GenderSelectorProps) {
  return (
    <div className="flex justify-center gap-2 overflow-x-auto pb-2">
      {genders.map((gender) => (
        <Button
          key={gender}
          onClick={() => onGenderChange(gender as "m" | "f" | "n")}
          variant="outline"
          className={cn(
            "px-3 py-1.5 text-sm font-medium transition-colors",
            selectedGender === gender
              ? "bg-background-dark text-vanilla"
              : "bg-vanilla/20 text-bistre hover:bg-vanilla/30"
          )}
        >
          {gender === "m" ? "Male" : gender === "f" ? "Female" : "Neutral"}
        </Button>
      ))}
    </div>
  );
} 