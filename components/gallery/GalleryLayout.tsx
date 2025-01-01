"use client";

import { Dragon } from "@/utils/types";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SearchBar } from "@/components/ui/search-bar";
import FilterBar from "@/components/gallery/FilterBar";
import { Pagination } from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface GalleryLayoutProps {
  initialData: Dragon[];
  regions: string[];
  searchParams: {
    region?: string;
    rarity?: "asc" | "desc";
    page?: string;
    search?: string;
    stage?: string;
  };
}

export function GalleryLayout({ initialData, regions, searchParams }: GalleryLayoutProps) {
  const router = useRouter();
  const searchParamsObj = useSearchParams();

  // Add state for stage and search
  const [selectedStage, setSelectedStage] = useState(Number(searchParams.stage) || 0);
  const [searchQuery, setSearchQuery] = useState(searchParams.search || "");

  const currentRegion = searchParams.region || null;
  const currentRarity = searchParams.rarity as "asc" | "desc" | null || null;
  const currentPage = Number(searchParams.page) || 1;

  // Update handlers to manage local state
  const handleStageSelect = useCallback(
    (stage: number) => {
      setSelectedStage(stage);
      const params = new URLSearchParams(searchParamsObj);
      if (stage !== 0) {
        params.set("stage", stage.toString());
      } else {
        params.delete("stage");
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParamsObj]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      const params = new URLSearchParams(searchParamsObj);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [router, searchParamsObj]
  );

  // Keep existing handlers
  const handleRegionSelect = useCallback(
    (region: string | null) => {
      const params = new URLSearchParams(searchParamsObj);
      if (region) {
        params.set("region", region);
      } else {
        params.delete("region");
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [router, searchParamsObj]
  );

  const handleRarityOrderChange = useCallback(
    (order: "asc" | "desc" | null) => {
      const params = new URLSearchParams(searchParamsObj);
      if (order) {
        params.set("rarity", order);
      } else {
        params.delete("rarity");
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [router, searchParamsObj]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParamsObj);
      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParamsObj]
  );

  // Filter and sort data
  let filteredData = [...initialData];
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredData = filteredData.filter(
      (egg) =>
        egg.name.toLowerCase().includes(query) ||
        egg.egg_description.toLowerCase().includes(query) ||
        egg.region.toLowerCase().includes(query) ||
        egg.rarity.toLowerCase().includes(query)
    );
  }

  if (currentRegion) {
    filteredData = filteredData.filter((egg) => egg.region === currentRegion);
  }

  if (currentRarity) {
    const rarityOrder = {
      common: 1,
      uncommon: 2,
      rare: 3,
      epic: 4,
      legendary: 5,
    };

    filteredData.sort((a, b) => {
      const aValue = rarityOrder[a.rarity.toLowerCase() as keyof typeof rarityOrder] || 0;
      const bValue = rarityOrder[b.rarity.toLowerCase() as keyof typeof rarityOrder] || 0;
      return currentRarity === "asc" ? aValue - bValue : bValue - aValue;
    });
  }

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8 px-6">
      <div className="flex justify-center">
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-md mx-auto"
          placeholder="Search dragons by name, region, or rarity..."
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <FilterBar
          regions={regions}
          selectedRegion={currentRegion}
          rarityOrder={currentRarity}
          selectedStage={selectedStage}
          onStageSelect={handleStageSelect}
          onRegionSelect={handleRegionSelect}
          onRarityOrderChange={handleRarityOrderChange}
          className="h-fit lg:sticky lg:top-4"
          selectedSort={null}
        />
        <div className="space-y-6">
          <GalleryGrid items={currentItems} selectedStage={selectedStage} />
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 