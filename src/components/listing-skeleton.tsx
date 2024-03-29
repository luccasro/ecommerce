import React from "react";
import { Skeleton } from "./ui/skeleton";

export const ListingSkeleton = () => {
  return Array.from({ length: 8 }).map((_, index) => (
    <div key={`listing-skeleton-${index}`} className="flex flex-col space-y-3">
      <Skeleton className="relative pb-[120%] aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7 rounded-xl bg-gray-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-[150px] bg-gray-200" />
        <Skeleton className="h-4 w-[50px] bg-gray-200" />
      </div>
    </div>
  ));
};
