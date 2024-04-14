import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button, buttonVariants } from "./ui/button";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ProductAdapted } from "@/models";

export const MiniBag = () => {
  const { data, isLoading } = useSWR("/api/bag", fetcher);
  const bagItems = data?.bagItems || [];

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger hideArrows className="p-0">
              <Link
                href="/bag"
                className={buttonVariants({ variant: "ghost" })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>
                <div className=" inset-0 overflow-hidden">
                  <div className=" inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed top-16 inset-y-0 right-0 flex max-w-full pl-10">
                      <div className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                              <h2
                                className="text-lg font-medium text-gray-900"
                                id="slide-over-title"
                              >
                                Shopping bag
                              </h2>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                >
                                  <span className="absolute -inset-0.5"></span>
                                  <span className="sr-only">Close panel</span>
                                  <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="mt-8">
                              <div className="flow-root">
                                <ul
                                  role="list"
                                  className="-my-6 divide-y divide-gray-200"
                                >
                                  {bagItems.map(
                                    (
                                      bagItem: ProductAdapted,
                                      index: number
                                    ) => (
                                      <li key={index} className="flex py-6">
                                        <div className="w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <Link
                                            href={`/product/${bagItem.productId}`}
                                          >
                                            <Image
                                              src={bagItem.styleImages.default}
                                              alt={bagItem.productDisplayName}
                                              className="h-full w-full object-cover object-top"
                                              width={0}
                                              height={0}
                                              sizes="100vw"
                                            />
                                          </Link>
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                              <h3>
                                                <a href="#">
                                                  <a href="#">
                                                    {bagItem.productDisplayName}
                                                  </a>
                                                </a>
                                              </h3>
                                              <p className="ml-4">
                                                ${bagItem.price}
                                              </p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                              {bagItem.baseColour}
                                            </p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                              Qty 1
                                            </p>

                                            <div className="flex">
                                              <Button
                                                variant="ghost"
                                                className="font-medium p-0 hover:bg-transparent hover:text-indigo-600"
                                              >
                                                Remove
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Total</p>
                              <p>$262.00</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                              Shipping and taxes calculated at checkout.
                            </p>
                            <div className="mt-6 w-full flex justify-center gap-4">
                              <Button
                                asChild
                                variant="outline"
                                className="w-1/2 text-center text-base font-medium"
                              >
                                <Link className="py-6" href="/bag">
                                  Bag
                                </Link>
                              </Button>
                              <Button
                                asChild
                                className="w-1/2 text-center text-base font-medium"
                              >
                                <Link className="py-6" href="/bag">
                                  Checkout
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
