import { ProductCard } from "@/components/listing/product-card";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Breadcrumbs from "@/components/breadcrumbs";
import { ListingSkeleton } from "@/components/listing/listing-skeleton";
import { Pagination } from "@/components/listing/pagination";
import { fetcher } from "@/utils/fetcher";
import { Filters } from "@/components/listing/filters";
import { apiRoutes } from "@/utils/routes";
import { ColumnsSelector } from "@/components/listing/columns-selector";
import { ProductSummary } from "@/models";

const ListingPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  const url = buildUrlApi({
    path: apiRoutes.products,
    query,
  });

  const { data, error, isLoading } = useSWR(url, () => fetcher(url), {
    revalidateOnFocus: false,
  });
  const products: ProductSummary[] = data?.products || [];
  const pages = data?.pages;
  const totalProducts = data?.totalProducts;
  const filterOptionsData = data?.filterOptions;
  const isSearch = query?.search;
  const isSeason = query?.season && !isSearch;
  const isEmptyProducts = !products.length && !isLoading;
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

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <div className="my-8">
      <Breadcrumbs withTitle={!isSearch} />
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
      {isSeason && (
        <div className="mt-8">
          <h1 className="font-bold uppercase italic pb-2 text-lg sm:text-4xl">
            {query.season} Looks
          </h1>
        </div>
      )}
      <div className="flex justify-end items-center my-4">
        <ColumnsSelector onChangeColumn={changeColumns} />
        <Filters
          filterOptions={filterOptions}
          totalProducts={totalProducts}
          isLoading={isLoading}
        />
      </div>
      {isEmptyProducts && (
        <h1 className="font-bold uppercase italic pb-6 text-xl md:text-3xl">
          Products not found
        </h1>
      )}
      <ul
        className={`grid grid-cols-2 lg:grid-cols-${columns} gap-x-4 gap-y-2 justify-center mb-4`}
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
      {!isEmptyProducts && pages && <Pagination pages={pages} />}
    </div>
  );
};

export default ListingPage;
