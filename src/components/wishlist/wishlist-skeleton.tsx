import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const WishlistSkeleton = () => {
  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="w-full overflow-y-auto pr-4 py-6 md:pr-6">
        <ul role="list" className="my-6">
          {Array.from({ length: 3 }, (_, index) => (
            <Fragment key={index}>
              <li className="flex pb-6">
                <div className="w-24 h-full flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Skeleton className="w-full pb-[133%]" />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <Skeleton className="w-64 h-4 mb-3" />
                    <Skeleton className=" mt-1 w-16 h-4" />
                  </div>
                </div>
              </li>
              <Separator className="mb-6" />
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};
