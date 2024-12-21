// Server Component
import GalleryClientContent from '@/components/gallery/GalleryClient';
import { getData } from '@/utils/api';
import { Dragon } from '@/utils/types';
import { notFound } from 'next/navigation';


export default async function Home() {
  const data = await getData();
  if (!('dragons' in data)) {
    notFound();
  }
  const { dragons } = data;
  const regions = [...new Set(dragons.map((item: Dragon) => item.region))] as string[];
  return <GalleryClientContent initialData={dragons} regions={regions} />;
}
