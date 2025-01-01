"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/ui/search-bar";
import FilterBar from "@/components/gallery/FilterBar";
import { Pagination } from "@/components/ui/pagination";
import { useCallback } from "react";

interface GalleryInteractionsProps {
  regions: string[];
  currentRegion: string | null;
  currentRarity: "asc" | "desc" | null;
  currentPage: number;
  selectedStage: number;
  searchQuery: string;
  totalPages: number;
  className?: string;
}

export function GalleryInteractions({
  regions,
  currentRegion,
  currentRarity,
  currentPage,
  selectedStage,
  searchQuery,
  totalPages,
  className,
}: GalleryInteractionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleStageSelect = useCallback(
    (stage: number) => {
      updateSearchParams({ stage: stage === 1 ? null : stage.toString() });
    },
    [updateSearchParams]
  );

  const handleRegionSelect = useCallback(
    (region: string | null) => {
      updateSearchParams({ region: region, page: null });
    },
    [updateSearchParams]
  );

  const handleRarityOrderChange = useCallback(
    (order: "asc" | "desc" | null) => {
      updateSearchParams({ rarity: order, page: null });
    },
    [updateSearchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateSearchParams({ page: page > 1 ? page.toString() : null });
    },
    [updateSearchParams]
  );

  const handleSearch = useCallback(
    (value: string) => {
      updateSearchParams({ search: value || null, page: null });
    },
    [updateSearchParams]
  );

  return (
    <>
      <div className="flex justify-center">
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-md mx-auto"
          placeholder="Search dragons by name, region, or rarity..."
        />
      </div>
      <div className={className}>
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
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
} 