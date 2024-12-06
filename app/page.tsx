// Server Component
import GalleryClientLoading from '@/components/GalleryClientLoading';
import { Dragon } from '@/types/dragon';
import { notFound } from 'next/navigation';

const apiUrl = "https://raw.githubusercontent.com/explicitdanger/eggs-db/refs/heads/main/dragon_list.json"

async function getData() {
  const resp = await fetch(
    apiUrl,
    { next: { revalidate: 3600 } }
  );
  if (!resp.ok) {
    notFound();
  }
  
  const data = await resp.json();
  const dragonsArray = Object.values(data.dragon[0]) as Dragon[];
  return { dragons: dragonsArray };
}

export default async function Home() {
  const data = await getData();
  if (!('dragons' in data)) {
    notFound();
  }
  const { dragons } = data;
  const regions = [...new Set(dragons.map((item: Dragon) => item.region))] as string[];
  return <GalleryClientLoading initialData={dragons} regions={regions} />;
}
