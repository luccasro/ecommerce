"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductAdapted } from "@/models";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/utils/fetcher";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const url = buildUrlApi({
    path: "/api/products",
    query: router.query,
    isQueryPath: true,
  });

  const { data, isLoading } = useSWR(url, fetcher, {
    // revalidateOnMount: false,
    // persistData: true,
    // refreshInterval: 3600000,
  });
  const product = data?.product as ProductAdapted;
  const error = data?.error;
  const [selectedImage, setSelectedImage] = useState(
    product?.styleImages?.default
  );

  useEffect(() => {
    if (!product) return;
    setSelectedImage(product?.styleImages?.default);
  }, [product]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product && !isLoading) {
    return <p>Product not found</p>;
  }

  const sideImages = [
    product?.styleImages?.default,
    product?.styleImages?.back,
    product?.styleImages?.front,
    product?.styleImages?.right,
  ];

  const handleImageClick = (imageURL: string) => {
    setSelectedImage(imageURL);
  };

  return (
    <div>
      <div className="md:flex items-start justify-center py-12">
        <div className="md:w-3/5 w-full md:sticky top-16">
          <div className="flex w-full">
            <div className="w-1/6 mr-2 flex flex-col gap-2">
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="relative pb-[133%] aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7 rounded-xl bg-gray-200"
                    />
                  ))
                : sideImages.map(
                    (src, index) =>
                      src && (
                        <Button
                          variant="link"
                          className="h-auto p-0"
                          onMouseEnter={() => handleImageClick(src)}
                          key={index}
                        >
                          <Image
                            className={`w-full ${
                              selectedImage === src &&
                              "border border-2 border-black"
                            }`}
                            alt={product?.productDisplayName}
                            src={src}
                            width={0}
                            height={0}
                            sizes="100vw"
                          />
                        </Button>
                      )
                  )}
            </div>
            <div className="w-full">
              {isLoading ? (
                <Skeleton className="relative pb-[133%] aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7 rounded-xl bg-gray-200" />
              ) : (
                <Image
                  className="w-full"
                  alt={product?.productDisplayName}
                  src={selectedImage}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              )}
            </div>
          </div>
        </div>
        <div className="md:w-2/5 w-full lg:ml-8 md:ml-6 md:mt-0 mt-6">
          {isLoading ? (
            <>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]   bg-gray-200" />
                <Skeleton className="h-4 w-3/4 bg-gray-200" />
                <Skeleton className="h-4 w-[50px] bg-gray-200" />
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-gray-200 pb-6">
                <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">
                  {product?.brandName}
                </p>
                <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white my-2">
                  {product?.productDisplayName}
                </h1>
                <p className="text-md font-semibold text-gray-600 dark:text-gray-300 ">
                  {product?.discountedPrice || product?.price} €
                </p>
              </div>
              <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
                  Colour
                </p>
                <div className="flex items-center justify-center">
                  <p className="text-sm leading-none text-gray-600 dark:text-gray-300">
                    {product?.baseColour}
                  </p>
                  <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"></div>
                  <svg
                    className="cursor-pointer text-gray-300 dark:text-white"
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L1 9"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="py-4 border-b border-gray-200 flex items-center justify-between mb-4">
                <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
                  Size
                </p>
                <div className="flex items-center justify-center">
                  {/* <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
                    38.2
                  </p> */}
                  <ToggleGroup type="single" variant="outline">
                    {product?.styleOptions?.map((size, index) => (
                      <ToggleGroupItem
                        value={size.value}
                        key={index}
                        className="ml-1"
                        // className="text-sm border border-gray-600 min-w-6 text-center bg-white text-gray-600 dark:text-gray-600 mr-3"
                      >
                        <div className="min-w-3"> {size.value}</div>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              <div className="mb-2">
                <Select>
                  <SelectTrigger className="w-full rounded-none border-black dark:border-white border py-6">
                    <SelectValue placeholder="Choose your size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product?.styleOptions?.map((size, index) => (
                      <SelectItem value={size.value} key={index}>
                        <div> {size.value}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                <div className="mr-2 w-full">
                  <Button className="h-full w-full py-3 flex rounded-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to bag
                  </Button>
                </div>
                <div className="w-16">
                  <Button
                    variant="outline"
                    className="h-full w-full py-3 flex border-black dark:border-white rounded-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-labelledby="wishlist-:R4k:"
                      className="h-6 w-6"
                      focusable="false"
                      aria-hidden="false"
                      role="img"
                    >
                      <title id="wishlist-:R4k:">Wishlist</title>
                      <path d="M17.488 1.11h-.146a6.552 6.552 0 0 0-5.35 2.81A6.57 6.57 0 0 0 6.62 1.116 6.406 6.406 0 0 0 .09 7.428c0 7.672 11.028 15.028 11.497 15.338a.745.745 0 0 0 .826 0c.47-.31 11.496-7.666 11.496-15.351a6.432 6.432 0 0 0-6.42-6.306zM12 21.228C10.018 19.83 1.59 13.525 1.59 7.442c.05-2.68 2.246-4.826 4.934-4.826h.088c2.058-.005 3.93 1.251 4.684 3.155.226.572 1.168.572 1.394 0 .755-1.907 2.677-3.17 4.69-3.16h.02c2.7-.069 4.96 2.118 5.01 4.817 0 6.089-8.429 12.401-10.41 13.8z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
              <div>
                {/* <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
                  Product Code: 8BN321AF2IF0NYA
                </p>
                <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                  Length: 13.2 inches
                </p>
                <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                  Height: 10 inches
                </p>
                <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                  Depth: 5.1 inches
                </p>
                <p className="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">
                  Composition: 100% calf leather, inside: 100% lamb leather
                </p> */}
              </div>
              <div>
                <div className="py-4 mt-7">
                  <Accordion
                    type="single"
                    defaultValue="description"
                    collapsible
                  >
                    <AccordionItem
                      className="border-gray-200 border-t"
                      value="description"
                    >
                      <AccordionTrigger className="text-base leading-4 text-gray-800 dark:text-gray-300">
                        Product Details
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: product?.productDescriptors
                              ?.value as string,
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      className=" border-gray-200"
                      value="shipping"
                    >
                      <AccordionTrigger className="text-base leading-4 text-gray-800 dark:text-gray-300">
                        Shipping and returns
                      </AccordionTrigger>
                      <AccordionContent>
                        You will be responsible for paying for your own shipping
                        costs for returning your item. Shipping costs are
                        nonrefundable
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem className=" border-gray-200" value="contact">
                      <AccordionTrigger className="text-base leading-4 text-gray-800 dark:text-gray-300">
                        Contact us
                      </AccordionTrigger>
                      <AccordionContent>
                        If you have any questions on how to return your item to
                        us, contact us.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
