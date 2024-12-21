import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dragon } from "@/types/dragon";

export function useGalleryFilters(initialData: Dragon[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRegion = searchParams.get("region");
  const currentRarity = searchParams.get("rarity") as "asc" | "desc" | null;
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";

  const updateUrlParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset page when filters change
      if (!('page' in updates)) {
        params.delete('page');
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handlers = {
    onRegionSelect: useCallback(
      (region: string | null) => updateUrlParams({ region }),
      [updateUrlParams]
    ),
    onRarityOrderChange: useCallback(
      (order: "asc" | "desc" | null) => updateUrlParams({ rarity: order }),
      [updateUrlParams]
    ),
    onPageChange: useCallback(
      (page: number) => updateUrlParams({ page: page > 1 ? page.toString() : null }),
      [updateUrlParams]
    ),
    onSearch: useCallback(
      (value: string) => updateUrlParams({ search: value || null }),
      [updateUrlParams]
    ),
  };

  const filteredData = useMemo(() => {
    let filtered = [...initialData];

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
        const aValue = rarityOrder[a.rarity.toLowerCase() as keyof typeof rarityOrder] || 0;
        const bValue = rarityOrder[b.rarity.toLowerCase() as keyof typeof rarityOrder] || 0;
        return currentRarity === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    return filtered;
  }, [initialData, currentRegion, currentRarity, searchQuery]);

  return {
    filters: {
      currentRegion,
      currentRarity,
      currentPage,
      searchQuery,
    },
    handlers,
    filteredData,
  };
} 