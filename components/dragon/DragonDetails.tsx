import { Dragon } from "@/utils/types";

interface DragonDetailsProps {
  dragon: Dragon;
}

export default function DragonDetails({ dragon }: DragonDetailsProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Description */}
      <div>
        <h2 className="text-xl sm:text-2xl font-medium text-bistre/90 mb-3 sm:mb-4 tracking-wide">
          Description
        </h2>
        <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-white/50 rounded-lg">
          <p className="text-center text-bistre/80 italic text-base sm:text-lg leading-relaxed">
            <span className="absolute left-2 sm:left-3 top-2 text-2xl sm:text-3xl text-bistre/30 font-serif">&ldquo;</span>
            {dragon.egg_description}
            <span className="absolute right-2 sm:right-3 bottom-2 text-2xl sm:text-3xl text-bistre/30 font-serif">&rdquo;</span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-2xl font-medium text-bistre/90 mb-4 tracking-wide">
          Details
        </h2>
        <dl className="grid grid-cols-2 gap-6">
          <div className="bg-white/30 p-4 rounded-lg">
            <dt className="text-sm font-medium text-bistre/60 mb-1">Region</dt>
            <dd className="text-bistre/90 font-medium">{dragon.region}</dd>
          </div>
          <div className="bg-white/30 p-4 rounded-lg">
            <dt className="text-sm font-medium text-bistre/60 mb-1">Rarity</dt>
            <dd className="text-bistre/90 font-medium">{dragon.rarity}</dd>
          </div>
          <div className="bg-white/30 p-4 rounded-lg">
            <dt className="text-sm font-medium text-bistre/60 mb-1">Type</dt>
            <dd className="text-bistre/90 font-medium">{dragon.dragon_type}</dd>
          </div>
          <div className="bg-white/30 p-4 rounded-lg">
            <dt className="text-sm font-medium text-bistre/60 mb-1">Elements</dt>
            <dd className="text-bistre/90 font-medium capitalize">
              {dragon.elements.join(', ')}
            </dd>
          </div>
        </dl>
      </div>

      {/* Additional Info */}
      <div>
        <h2 className="text-2xl font-medium text-bistre/90 mb-4 tracking-wide">
          Additional Information
        </h2>
        <dl className="grid grid-cols-2 gap-6">
          <div className="bg-white/30 p-4 rounded-lg">
            <dt className="text-sm font-medium text-bistre/60 mb-1">Body Type</dt>
            <dd className="text-bistre/90 font-medium">{dragon.body_type}</dd>
          </div>
          <div className="bg-white/30 p-4 rounded-lg">
            <dt className="text-sm font-medium text-bistre/60 mb-1">Breeding Tier</dt>
            <dd className="text-bistre/90 font-medium">{dragon.breeding_tier}</dd>
          </div>
          <div className="bg-white/30 p-4 rounded-lg">
            <dt className="text-sm font-medium text-bistre/60 mb-1">Tradeable</dt>
            <dd className="text-bistre/90 font-medium">{dragon.tradeable ? 'Yes' : 'No'}</dd>
          </div>
          <div className="bg-white/30 p-4 rounded-lg">
            <dt className="text-sm font-medium text-bistre/60 mb-1">Food</dt>
            <dd className="text-bistre/90 font-medium">{dragon.food}</dd>
          </div>
        </dl>
      </div>

      {/* Forms */}
      {dragon.forms && dragon.forms.length > 0 && (
        <div>
          <h2 className="text-2xl font-medium text-bistre/90 mb-4 tracking-wide">
            Available Forms
          </h2>
          <ul className="bg-white/30 rounded-lg p-4 space-y-2">
            {dragon.forms.map((form, index) => (
              <li key={index} className="text-bistre/80 capitalize flex items-center">
                <span className="w-2 h-2 bg-bistre/30 rounded-full mr-3" />
                {form}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 