import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
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
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Sort } from "./sort";

interface FiltersProps {
  filterOptions?: FilterOptions;
  totalProducts?: number;
}

export const Filters: React.FC<FiltersProps> = ({
  filterOptions,
  totalProducts,
}) => {
  const router = useRouter();
  const hasFilters =
    Object.keys(router.query).filter((key) => key !== "slug").length > 0;
  const [productsCount, setProductsCount] = useState<number>(
    totalProducts || 0
  );

  useEffect(() => {
    if (!totalProducts || totalProducts === productsCount) return;
    setProductsCount(totalProducts || 0);
  }, [productsCount, totalProducts]);

  const clearAllFilters = () => {
    router.push({
      pathname: router.pathname,
      query: router.query.slug ? { slug: router.query.slug } : {},
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex gap-2">
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
          {/* <SheetDescription className="px-6">
            Make changes to your filters here.
          </SheetDescription> */}
        </SheetHeader>
        <div className="px-6">
          {/* <Button onClick={clearAllFilters} className="w-full mt-4">
            Clear Filters
          </Button> */}
          <div className="py-4">
            <Sort />
            <PriceRange />
            <SizeSelector sizes={filterOptions?.sizes} />
            <BrandSelector brands={filterOptions?.brands} />
          </div>
        </div>
        <SheetFooter className="px-6 gap-2 sm:gap-0">
          <Button
            onClick={clearAllFilters}
            disabled={!hasFilters}
            variant="secondary"
            className="w-full"
          >
            Clear Filters
          </Button>
          <SheetClose asChild>
            <Button type="submit" className="w-full">
              Show {productsCount} results
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
