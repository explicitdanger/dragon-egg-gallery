"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GenderSelectorProps {
  genders: string[];
  selectedGender: "m" | "f" | "n";
  onGenderChange: (gender: "m" | "f" | "n") => void;
}

export function GenderSelector({ genders, selectedGender, onGenderChange }: GenderSelectorProps) {
  const genderImages = {
    f: "/gender_f_0201.png",
    m: "/gender_m_0201.png",
    n: "/gender_n_0201.png",
  };

  return (
    <div className="flex justify-center gap-2 overflow-x-auto pb-2">
      {genders.map((gender) => (
        <Button
          key={gender}
          onClick={() => onGenderChange(gender as "m" | "f" | "n")}
          variant="outline"
          className={cn(
            "p-1 h-auto transition-colors",
            selectedGender === gender
              ? "bg-background-dark hover:bg-background-dark/90"
              : "bg-vanilla/20 hover:bg-vanilla/30"
          )}
        >
          <Image
            src={genderImages[gender as keyof typeof genderImages]}
            alt={gender === "m" ? "Male" : gender === "f" ? "Female" : "Neutral"}
            width={24}
            height={24}
            className={cn(
              "w-6 h-6",
              selectedGender === gender 
                ? "brightness-100" 
                : "brightness-50 hover:brightness-75"
            )}
          />
        </Button>
      ))}
    </div>
  );
} 