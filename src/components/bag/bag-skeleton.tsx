import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

export const BagSkeleton = () => {
  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="md:w-2/3 overflow-y-auto pr-4 py-6 md:pr-6">
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
      <div className="md:w-1/3 rounded-lg py-6 my-6 md:pl-6">
        <Skeleton className="w-64 h-4 mb-6" />
        <Skeleton className="w-48 h-4 mb-6" />
        <Skeleton className="w-32 h-4" />
      </div>
    </div>
  );
};
