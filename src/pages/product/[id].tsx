"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Product, ProductAdapted } from "@/models";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

// Add the import statement for the Image component
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const fetcher = (url: any) => fetch(url).then((r) => r.json());

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const url = buildUrlApi({
    path: "/api/products",
    query: router.query,
    isQueryPath: true,
  });

  const { data, isLoading } = useSWR(url, fetcher);
  const product = data?.product as ProductAdapted;
  const error = data?.error;
  const [selectedImage, setSelectedImage] = useState(
    product?.styleImages?.default
  );

  useEffect(() => {
    if (!product) return;
    setSelectedImage(product?.styleImages?.default);
  }, [product]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
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
        <div className="md:w-1/2 w-full sticky top-16">
          <div className="flex w-full">
            <div className="w-1/6 mr-2 flex flex-col gap-2">
              {sideImages.map(
                (src, index) =>
                  src && (
                    <Button
                      variant="link"
                      className={`h-auto p-0 ${
                        selectedImage === src &&
                        "border border-4 border-blue-600"
                      }`}
                      onClick={() => handleImageClick(src)}
                      key={index}
                    >
                      <Image
                        className="w-full"
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
              <Image
                className="w-full"
                alt="image of a girl posing"
                src={selectedImage}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">
              {product?.brandName}
            </p>
            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
              {product?.productDisplayName}
            </h1>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
              Colours
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
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
              Size
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
                38.2
              </p>
              <svg
                className="text-gray-300 dark:text-white cursor-pointer"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L1 9"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <button className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
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
            Add to cart
          </button>
          <div>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
              It is a long established fact that a reader will be distracted by
              thereadable content of a page when looking at its layout. The
              point of usingLorem Ipsum is that it has a more-or-less normal
              distribution of letters.
            </p>
            <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
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
            </p>
          </div>
          <div>
            <div className="border-t py-4 mt-7 border-gray-200">
              <Accordion type="single" collapsible>
                <AccordionItem className=" border-gray-200" value="item-1">
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
                <AccordionItem className=" border-gray-200" value="item-2">
                  <AccordionTrigger className="text-base leading-4 text-gray-800 dark:text-gray-300">
                    Contact us
                  </AccordionTrigger>
                  <AccordionContent>
                    If you have any questions on how to return your item to us,
                    contact us.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: product?.productDescriptors?.value as string,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
