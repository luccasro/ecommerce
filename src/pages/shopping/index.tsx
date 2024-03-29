"use client";
import Layout from "@/app/layout";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useHydrationRender } from "@/hooks/useHydratationRender";
import { Product } from "@/models";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { getProducts } from "@/utils/products";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import useSWR from "swr";
import { getHeaderLink } from "@/utils/headerLinks";
import Breadcrumbs from "@/components/breadcrumbs";
import { Sort } from "@/components/sort";
import { ListingSkeleton } from "@/components/listing-skeleton";
import { Pagination } from "@/components/pagination";

const fetcher = (url: any) => fetch(url).then((r) => r.json());

const ListingPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  const url = buildUrlApi({
    path: "/api/products",
    query,
  });

  const { data, error: errorData, isLoading } = useSWR(url, () => fetcher(url));
  const products = data?.products;
  const pages = data?.pages;
  const totalProducts = data?.totalProducts;
  const isSearch = query?.search;

  const error = data?.error;
  const [columns, setColumns] = useState(4);

  const toggleColumns = () => {
    setColumns(columns === 3 ? 4 : 3);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-4">
      <Breadcrumbs />
      {isSearch && (
        <div className="mt-8">
          <p className="text-sm pb-2">Your results for: </p>
          <h1 className="font-bold uppercase italic pb-2 text-lg sm:text-4xl">
            {`"${query?.search}"`}
            <span className="pl-2 text-sm text-gray-500 lowercase not-italic">
              [{totalProducts} items]
            </span>
          </h1>
        </div>
      )}
      <div className="flex justify-end items-center">
        <Button className="my-4 mr-4" onClick={toggleColumns}>
          {columns === 3 ? "Show 4 columns" : "Show 3 columns"}
        </Button>
        <Sort />
      </div>
      <ul
        className={`grid grid-cols-2 lg:grid-cols-${columns} gap-4 justify-center mb-4`}
      >
        {isLoading ? (
          <ListingSkeleton />
        ) : (
          products?.map((product: any) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))
        )}
      </ul>
      <Pagination pages={pages} />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<
//   ListingPageProps
// > = async (context) => {
//   // const category = context.params?.category as string;
//   const { req } = context;
//   const { url } = req;

//   const finalPath = url?.split("/");
//   const category = finalPath?.[finalPath?.length - 1];
//   const products = await getProducts({ category });
//   return { props: { products } };
// };

export default ListingPage;
