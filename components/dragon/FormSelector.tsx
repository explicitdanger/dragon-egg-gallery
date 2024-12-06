"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSelectorProps {
  forms: string[];
  selectedForm: string;
  onFormChange: (value: string) => void;
  textColor?: string;
}

export function FormSelector({ 
  forms, 
  selectedForm, 
  onFormChange,
  textColor = "text-vanilla"
}: FormSelectorProps) {
  const currentIndex = forms.indexOf(selectedForm);

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
        onClick={() => onFormChange(forms[Math.max(0, currentIndex - 1)])}
        disabled={currentIndex === 0}
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
        {selectedForm}
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
        onClick={() => onFormChange(forms[Math.min(forms.length - 1, currentIndex + 1)])}
        disabled={currentIndex === forms.length - 1}
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  );
} 