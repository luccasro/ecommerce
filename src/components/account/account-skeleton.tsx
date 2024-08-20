import { Skeleton } from "../ui/skeleton";

export const AccountSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[400px] bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-[200px] bg-gray-200" />
      </div>
    </div>
  );
};
