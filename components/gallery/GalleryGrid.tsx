"use client";

import { Dragon } from "@/utils/types";
import EggCard from "@/components/gallery/EggCard";

interface GalleryGridProps {
  items: Dragon[];
  selectedStage: number;
}

export function GalleryGrid({ items, selectedStage }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((egg) => (
        <EggCard 
          key={egg.name} 
          egg={egg} 
          selectedStage={selectedStage} 
        />
      ))}
    </div>
  );
} 