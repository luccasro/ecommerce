"use client";
import { Separator } from "@/components/ui/separator";
import { ProductAdapted } from "@/models";
import Image from "next/image";
// import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/utils/fetcher";

const Bag: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR("/api/bag", fetcher);
  const bagItems = data?.bagItems || [];

  return (
    <div>
      <div className="w-full">
        {/* <h2 className="text-2xl font-semibold py-6"> Your Bag</h2> */}
        <h1 className="font-bold uppercase italic py-6 text-lg sm:text-3xl">
          Your bag
        </h1>

        <div className="flex h-full flex-col sm:flex-row">
          <div className="sm:w-2/3 overflow-y-auto pr-4 py-6 sm:pr-6">
            <ul role="list" className="my-6">
              {bagItems?.map((bagItem: ProductAdapted) => (
                <>
                  <li className="flex pb-6">
                    <div className="w-24 h-full flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Link href={`/product/${bagItem.productId}`}>
                        <Image
                          src={bagItem.styleImages.default}
                          alt={bagItem.productDisplayName}
                          className="w-full object-cover object-top"
                          width={0}
                          height={0}
                          sizes="100vw"
                        />
                      </Link>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <a href="#">{bagItem.productDisplayName}</a>
                          </h3>
                          <p className="ml-4">${bagItem.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {bagItem.baseColour}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="">Qty 1</p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <Separator className="mb-6" />
                </>
              ))}
            </ul>
          </div>

          {!!bagItems.length && (
            <div className="sm:w-1/3 rounded-lg py-6 my-6 sm:pl-6">
              <h2 className="text-lg font-medium pb-6">Order summary</h2>

              <div className="flex justify-between text-base text-sm py-4">
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <Separator />
              <div className="flex justify-between text-base text-sm py-4">
                <p>Shipping estimate</p>
                <p>$5.00</p>
              </div>
              <Separator />
              <div className="flex justify-between text-base text-sm py-4">
                <p>Tax estimate</p>
                <p>$8.00</p>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold py-4">
                <p>Total</p>
                <p>$235.00</p>
              </div>
              <p className="mt-0.5 text-sm">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bag;
