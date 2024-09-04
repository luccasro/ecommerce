import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button, buttonVariants } from "../ui/button";
import { ShoppingBag, X } from "lucide-react";
import { pageRoutes } from "@/utils/routes";
import { useBag } from "@/contexts/bag-contex";

export const MiniBag = () => {
  const {
    bag,
    totalProducts,
    openMinibag,
    closeMinibag,
    removeItemFromBag,
    isSubmitting,
  } = useBag();
  const bagItems = bag?.items || [];

  const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (openMinibag) {
      return <div onMouseLeave={closeMinibag}>{children}</div>;
    }
    return <NavigationMenuContent>{children}</NavigationMenuContent>;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger hideArrows className="p-0 bg-transparent">
            <Link
              href={pageRoutes.bag}
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "relative",
              })}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalProducts && (
                <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white font-mono text-[10px] leading-normal text-center">
                  {totalProducts}
                </span>
              )}
            </Link>
          </NavigationMenuTrigger>
          <Content>
            <div>
              <div className="inset-0 overflow-hidden">
                <div className="inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed top-16 inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900">
                              Your bag
                            </h2>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Close panel</span>
                                <X className="w-6 h-6" />
                              </button>
                            </div>
                          </div>
                          {!bagItems.length && (
                            <div className="mt-8">
                              <p className="text-black">Your bag is empty.</p>
                            </div>
                          )}
                          {!!bagItems.length && (
                            <div className="mt-8">
                              <div className="flow-root">
                                <ul
                                  role="list"
                                  className="-my-6 divide-y divide-gray-200"
                                >
                                  {bagItems?.map(
                                    (
                                      { product, quantity, id: bagItemId },
                                      index: number
                                    ) => (
                                      <li key={index} className="flex py-6">
                                        <div className="w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <Link
                                            href={`${pageRoutes.product}/${product.slug}`}
                                          >
                                            <Image
                                              src={product.styleImages.default}
                                              alt={product.productDisplayName}
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
                                                    {product.productDisplayName}
                                                  </a>
                                                </a>
                                              </h3>
                                              <p className="ml-4">
                                                ${product.price}
                                              </p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                              {product.baseColour}
                                            </p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                              Qty {quantity}
                                            </p>
                                            <div className="flex">
                                              <Button
                                                variant="ghost"
                                                disabled={isSubmitting}
                                                onClick={() =>
                                                  removeItemFromBag(
                                                    bagItemId,
                                                    product.productId
                                                  )
                                                }
                                                className="font-medium p-0 h-auto hover:bg-transparent hover:text-indigo-600"
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
                          )}
                        </div>
                        {!!bagItems.length && (
                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Total</p>
                              <p>{bag?.summary?.total} €</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                              Shipping and taxes calculated at checkout.
                            </p>
                            <div className="mt-6 w-full flex justify-center gap-4">
                              <Button
                                asChild
                                variant="secondary"
                                className="w-1/2 text-base font-medium"
                              >
                                <Link className="py-6" href={pageRoutes.bag}>
                                  Bag
                                </Link>
                              </Button>
                              <Button
                                asChild
                                className="w-1/2 text-base font-medium"
                              >
                                <Link className="py-6" href={pageRoutes.bag}>
                                  Checkout
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
