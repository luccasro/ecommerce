import { Skeleton } from "../ui/skeleton";

export const AccountSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 pt-6 sm:p-10 sm:pt-6 md:block">
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/5 bg-gray-200" />
        <Skeleton className="h-4 w-5/6 bg-gray-200" />
        <Skeleton className="h-4 w-1/4 bg-gray-200" />
      </div>
    </div>
  );
};
