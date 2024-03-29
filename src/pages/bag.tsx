"use client";
import { Separator } from "@/components/ui/separator";
import { NextPage } from "next";

const Bag: NextPage = () => {
  return (
    <div>
      <div className="w-full">
        <div className="flex h-full flex-col sm:flex-row">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <h2 className="text-2xl font-medium">Bag</h2>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="my-6">
                  <li className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <a href="#">Throwback Hip Bag</a>
                          </h3>
                          <p className="ml-4">$90.00</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Salmon</p>
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
                  <Separator />
                  <li className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                        alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <a href="#">Medium Stuff Satchel</a>
                          </h3>
                          <p className="ml-4">$32.00</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Blue</p>
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
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg px-4 py-6 sm:px-6">
            <div className="">
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
              <div className="flex justify-between text-base font-md py-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
