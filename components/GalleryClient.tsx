"use client";

import { useCallback, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterBar from "@/components/FilterBar";
import EggCard from "@/components/EggCard";
import { Pagination } from "@/components/ui/pagination";
import { SearchBar } from "@/components/ui/search-bar";
import { Dragon } from "@/types/dragon";

interface GalleryClientProps {
  initialData: Dragon[];
  regions: string[];
}

export default function GalleryClientContent({
  initialData,
  regions,
}: GalleryClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL-based filters including stage
  const currentRegion = searchParams.get("region");
  const currentRarity = searchParams.get("rarity") as "asc" | "desc" | null;
  const currentPage = Number(searchParams.get("page")) || 1;
  const urlStage = Number(searchParams.get("stage")) || 0;

  const [selectedStage, setSelectedStage] = useState(urlStage);

  // Add search state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  // Update URL when stage changes
  const handleStageSelect = useCallback(
    (stage: number) => {
      const params = new URLSearchParams(searchParams);
      if (stage !== 1) {
        // Only add to URL if not default
        params.set("stage", stage.toString());
      } else {
        params.delete("stage");
      }
      router.push(`?${params.toString()}`);
      setSelectedStage(stage);
    },
    [router, searchParams]
  );

  // Filter handlers
  const handleRegionSelect = useCallback(
    (region: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (region) {
        params.set("region", region);
      } else {
        params.delete("region");
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleRarityOrderChange = useCallback(
    (order: "asc" | "desc" | null) => {
      const params = new URLSearchParams(searchParams);
      if (order) {
        params.set("rarity", order);
      } else {
        params.delete("rarity");
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Add search handler
  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
      setSearchQuery(value);
    },
    [router, searchParams]
  );

  // Filter and sort data
  const sortedData = useMemo(() => {
    let filtered = [...initialData];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (egg) =>
          egg.name.toLowerCase().includes(query) ||
          egg.egg_description.toLowerCase().includes(query) ||
          egg.region.toLowerCase().includes(query) ||
          egg.rarity.toLowerCase().includes(query)
      );
    }

    // Apply existing filters
    if (currentRegion) {
      filtered = filtered.filter((egg) => egg.region === currentRegion);
    }

    if (currentRarity) {
      const rarityOrder = {
        common: 1,
        uncommon: 2,
        rare: 3,
        epic: 4,
        legendary: 5,
      };

      filtered.sort((a, b) => {
        const aValue =
          rarityOrder[a.rarity.toLowerCase() as keyof typeof rarityOrder] || 0;
        const bValue =
          rarityOrder[b.rarity.toLowerCase() as keyof typeof rarityOrder] || 0;
        return currentRarity === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    return filtered;
  }, [initialData, currentRegion, currentRarity, searchQuery]);

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Update the currentItems to include egg_img_url
  const currentItems = useMemo(() => {
    const paginatedItems = sortedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    // If egg stage is selected (0), include the egg_img_url
    if (selectedStage === 0) {
      return paginatedItems.map((item) => ({
        ...item,
        isEggStage: true,
        egg_img_url: item.egg_img_url, // Make sure this is available for EggCard
      }));
    }

    return paginatedItems;
  }, [sortedData, currentPage, itemsPerPage, selectedStage]);

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
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 ">
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
          {/* Add SearchBar */}

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentItems.map((egg, index) => (
              <EggCard key={index} egg={egg} selectedStage={selectedStage} />
            ))}
          </div>

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
