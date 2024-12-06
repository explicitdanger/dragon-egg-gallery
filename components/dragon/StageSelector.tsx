"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StageSelectorProps {
  stages: readonly ["egg", "hatch", "hatchling", "adult"];
  selectedStage: number;
  onStageChange: (stage: number) => void;
  textColor?: string;
}

export function StageSelector({ stages, selectedStage, onStageChange, textColor = "text-bistre/70" }: StageSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 mt-2">
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-6 w-6 sm:h-8 sm:w-8 shrink-0",
          "border-bistre/20",
          "bg-background-dark text-vanilla",
          "hover:bg-vanilla hover:text-bistre",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        onClick={() => onStageChange(Math.max(0, selectedStage - 1))}
        disabled={selectedStage === 0}
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>

      <div className={cn(
        "text-center font-sans font-medium capitalize",
        "text-sm sm:text-base md:text-lg",
        "max-w-[200px] sm:max-w-none",
        "truncate px-2",
        textColor
      )}>
        {stages[selectedStage]}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-6 w-6 sm:h-8 sm:w-8 shrink-0",
          "border-bistre/20",
          "bg-background-dark text-vanilla",
          "hover:bg-vanilla hover:text-bistre",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        onClick={() => onStageChange(Math.min(stages.length - 1, selectedStage + 1))}
        disabled={selectedStage === stages.length - 1}
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  );
} 