// Server Component
import GalleryClientLoading from '@/components/GalleryClientLoading';
import { getData } from '@/lib/utils';
import { Dragon } from '@/types/dragon';
import { notFound } from 'next/navigation';


export default async function Home() {
  const data = await getData();
  if (!('dragons' in data)) {
    notFound();
  }
  const { dragons } = data;
  const regions = [...new Set(dragons.map((item: Dragon) => item.region))] as string[];
  return <GalleryClientLoading initialData={dragons} regions={regions} />;
}
