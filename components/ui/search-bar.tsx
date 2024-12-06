"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  className,
  placeholder = "Search dragons..."
}: SearchBarProps) {
  return (
    <div className={cn(
      "relative w-full sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto", 
      className
    )}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bistre/50" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-vanilla/95 pl-10 text-bistre border-bistre/20 
                  focus-visible:ring-bistre/20 focus-visible:ring-offset-0
                  selection:bg-bistre/20 placeholder:text-bistre/50 
                  rounded-xl transition-colors duration-200
                  hover:bg-vanilla focus:bg-vanilla"
      />
    </div>
  );
} 