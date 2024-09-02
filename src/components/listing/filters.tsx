import * as React from "react";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PriceRange } from "./price-range";
import { useRouter } from "next/router";
import { FilterOptions } from "@/models";
import { BrandSelector } from "./brand-selector";
import { SizeSelector } from "./size-selector";
import { Separator } from "../ui/separator";
import { Sort } from "./sort";

interface FiltersProps {
  filterOptions?: FilterOptions;
  totalProducts?: number;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Filters: React.FC<FiltersProps> = ({
  filterOptions,
  totalProducts = 0,
  isLoading,
  disabled,
}) => {
  const router = useRouter();
  const hasFilters =
    Object.keys(router.query).filter((key) => key !== "slug").length > 0;

  const clearAllFilters = () => {
    router.push({
      pathname: router.pathname,
      query: router.query.slug ? { slug: router.query.slug } : {},
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" disabled={disabled} className="flex gap-2">
          <SlidersHorizontal size={16} />
          <span className="uppercase text-sm">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full md:w-unset p-0 overflow-auto"
        side="right"
      >
        <SheetHeader className="py-2">
          <SheetTitle className="px-6 pt-2 uppercase text-md">
            Filters
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <div className="px-6">
          <div className="py-4">
            {filterOptions ? (
              <>
                <Sort />
                <PriceRange />
                <SizeSelector sizes={filterOptions?.sizes} />
                <BrandSelector brands={filterOptions?.brands} />
              </>
            ) : (
              <div className="flex w-full justify-center items-center">
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </div>
        </div>
        <SheetFooter className="px-6 pb-4 gap-2 sm:gap-0">
          <Button
            onClick={clearAllFilters}
            disabled={!hasFilters}
            variant="secondary"
            className="w-full"
          >
            Clear Filters
          </Button>
          <SheetClose asChild>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {!isLoading ? (
                <p>Show {totalProducts} results</p>
              ) : (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
