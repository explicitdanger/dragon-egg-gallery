import BreedingNestClient from "./BreedingNestClient";
import { getData } from "@/utils/api";
import { notFound } from "next/navigation";
import { Dragon } from "@/utils/types";

export default async function BreedingNest() {
  const data = await getData();
  if (!("dragons" in data)) {
    notFound();
  }
  const { dragons } = data as { dragons: Dragon[] };

  return (
    <div className="w-full">
      <BreedingNestClient dragons={dragons} />
    </div>
  );
}
