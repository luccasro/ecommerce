import { ProductCard } from "@/components/listing/product-card";
import { Button } from "@/components/ui/button";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Breadcrumbs from "@/components/breadcrumbs";
import { Sort } from "@/components/listing/sort";
import { ListingSkeleton } from "@/components/listing/listing-skeleton";
import { Pagination } from "@/components/listing/pagination";
import { fetcher } from "@/utils/fetcher";

const ListingPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  const url = buildUrlApi({
    path: "/api/products",
    query,
  });
  console.log(query);
  // const gender = localStorage.getItem("gender");

  // if (query.gender && gender !== query.gender) {
  //   localStorage.setItem("gender", query.gender as string);
  // }

  const { data, error, isLoading } = useSWR(url, () => fetcher(url), {
    // revalidateOnMount: query.gender ? gender !== query.gender : true,
    // refreshInterval: 3600000, // 1hour
  });
  const products = data?.products || [];
  const pages = data?.pages;
  const totalProducts = data?.totalProducts;
  const isSearch = query?.search;
  const [columns, setColumns] = useState(4);

  const toggleColumns = () => {
    setColumns(columns === 3 ? 4 : 3);
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
          <Button
            className=" mr-4 hidden lg:inline-block"
            onClick={toggleColumns}
          >
            {columns === 3 ? "Show 4 columns" : "Show 3 columns"}
          </Button>
          <Sort />
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
