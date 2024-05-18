import { Skeleton } from "../ui/skeleton";

export const DetailsSkeleton: React.FC = () => {
  return (
    <div className="md:flex items-start justify-center py-12">
      <div className="md:w-3/5 w-full md:sticky top-16">
        <div className="flex flex-col sm:flex-row w-full">
          <div className="w-1/6 mr-2 flex-col gap-2 hidden sm:flex">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="relative pb-[133%] aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7 rounded-xl bg-gray-200"
              />
            ))}
          </div>
          <div className="w-full">
            <Skeleton className="relative pb-[133%] aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7 rounded-xl bg-gray-200" />
          </div>
        </div>
        <div className="mt-4 w-full sm:hidden">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="relative pb-[33%] aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7 rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-2/5 w-full lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] bg-gray-200" />
          <Skeleton className="h-4 w-3/4 bg-gray-200" />
          <Skeleton className="h-4 w-[50px] bg-gray-200" />
        </div>
      </div>
    </div>
  );
};
