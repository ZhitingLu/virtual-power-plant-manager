import { 
  MapPinIcon,    
  LightBulbIcon 
} from '@heroicons/react/24/outline'

import type { PowerPlant } from "@vpp/types";

interface PlantsGridProps {
  plants: PowerPlant[]
}

export default function PlantsGrid({ plants }: PlantsGridProps) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {plants.map((plant) => (
        <li
          key={plant.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{plant.name}</h3>
                <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                  {plant.role}
                </span>
              </div>
            </div>
            <img alt="" src={plant.imageUrl} className="size-10 shrink-0 rounded-full bg-gray-300" />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href=''
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <MapPinIcon aria-hidden="true" className="size-5 text-gray-400 hover:text-indigo-600" />
                  {plant.location? plant.location : 'No location provided'}
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href=''
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <LightBulbIcon aria-hidden="true" className="size-5 text-gray-400 hover:text-amber-600" />
                  {plant.capacity? `${plant.capacity} MW` : 'No capacity provided'}
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
