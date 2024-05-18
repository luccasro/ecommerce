import { ProductCard } from "@/components/listing/product-card";
import { Button } from "@/components/ui/button";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Breadcrumbs from "@/components/breadcrumbs";
import { Sort } from "@/components/listing/sort";
import { ListingSkeleton } from "@/components/listing/listing-skeleton";
import { Pagination } from "@/components/listing/pagination";
import { fetcher } from "@/utils/fetcher";
import { Filters } from "@/components/listing/filters";
import { cn } from "@/utils/cn";

const ListingPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  const url = buildUrlApi({
    path: "/api/products",
    query,
  });

  const { data, error, isLoading } = useSWR(url, () => fetcher(url), {
    // revalidateOnMount: query.gender ? gender !== query.gender : true,
    // refreshInterval: 3600000, // 1hour
  });
  const products = data?.products || [];
  const pages = data?.pages;
  const totalProducts = data?.totalProducts;
  const filterOptionsData = data?.filterOptions;
  const isSearch = query?.search;
  const [columns, setColumns] = useState(4);
  const [filterOptions, setFilterOptionsData] = useState(filterOptionsData);
  const [currentSlug, setCurrentSlug] = useState<string | string[] | undefined>(
    undefined
  );

  const isSlugChanged = useMemo(
    () => JSON.stringify(currentSlug) !== JSON.stringify(query.slug),
    [currentSlug, query.slug]
  );

  useEffect(() => {
    if (!filterOptions || isSlugChanged) {
      setFilterOptionsData(filterOptionsData);
    }
  }, [filterOptions, filterOptionsData, isSlugChanged]);

  useEffect(() => {
    if (isSlugChanged) {
      setCurrentSlug(query.slug);
    }
  }, [isSlugChanged, query.slug]);

  const changeColumns = (column: number) => {
    setColumns(column);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-8">
      <Breadcrumbs />
      {isSearch && (
        <div className="mt-8">
          <p className="text-sm pb-2">Your results for: </p>
          <h1 className="font-bold uppercase italic pb-2 text-lg sm:text-4xl">
            {`"${query?.search}"`}
            <span className="pl-2 text-sm text-gray-500 lowercase not-italic">
              [{totalProducts || 0} items]
            </span>
          </h1>
        </div>
      )}
      <div className="flex justify-end items-center my-4">
        <>
          <p className="text-sm mr-4">
            <span className="text-muted-foreground">VIEW:</span>{" "}
            <span
              className={cn(
                "text-muted-foreground",
                columns === 3 && "text-foreground"
              )}
            >
              <Button
                variant="ghost"
                onClick={() => changeColumns(3)}
                className="p-0 hover:bg-transparent"
              >
                3
              </Button>
            </span>{" "}
            <span className="text-foreground">|</span>{" "}
            <span
              className={cn(
                "text-muted-foreground",
                columns === 4 && "text-foreground"
              )}
            >
              <Button
                variant="ghost"
                onClick={() => changeColumns(4)}
                className="p-0 hover:bg-transparent"
              >
                4
              </Button>
            </span>
          </p>
          <Filters
            filterOptions={filterOptions}
            totalProducts={totalProducts}
          />
        </>
      </div>
      <ul
        className={`grid grid-cols-2 lg:grid-cols-${columns} gap-4 justify-center mb-4`}
      >
        {isLoading ? (
          <ListingSkeleton />
        ) : (
          products.map((product: any) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))
        )}
      </ul>
      {!isLoading && !!products.length && <Pagination pages={pages} />}
    </div>
  );
};

export default ListingPage;
