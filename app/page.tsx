// Server Component
import { getData } from '@/utils/api';
import { GalleryLayout } from '@/components/gallery/GalleryLayout';
import { notFound } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{
    region?: string;
    rarity?: "asc" | "desc";
    page?: string;
    search?: string;
    stage?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const data = await getData();
  if (!('dragons' in data)) {
    notFound();
  }
  
  const { dragons } = data;
  const regions = [...new Set(dragons.map(item => item.region))] as string[];
  
  return (
    <GalleryLayout 
      initialData={dragons} 
      regions={regions} 
      searchParams={await searchParams}
    />
  );
}
