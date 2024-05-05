import { Separator } from "@/components/ui/separator";
import { NextPage } from "next";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/utils/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { BagAdapted } from "@/models";
import { useToast } from "@/components/ui/use-toast";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { Fragment } from "react";
import { BagItem } from "@/components/bag/bag-item";

const Bag: NextPage = () => {
  const { toast } = useToast();

  const { data, mutate, isLoading, isValidating } = useSWR(
    "/api/bag",
    fetcher,
    {
      revalidateOnMount: true,
    }
  );
  const bag: BagAdapted = data?.bag;
  const bagItems = bag?.items || [];
  const summary = bag?.summary;

  const removeItemFromBag = async (bagItemId: number, productId: number) => {
    try {
      const apiUrl = buildUrlApi({
        path: "/api/bag/delete",
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bagId: bag.id, bagItemId, productId }),
      });

      if (!response.ok) {
        const { bagItem, summary } = await response.json();
        toast({
          title: "Error removing item from bag.",
          variant: "destructive",
        });
      }
      await mutate();

      toast({
        title: "Item removed from bag successfully.",
      });
    } catch (error) {
      console.error("Error removing item from bag:", error);
      throw error;
    }
  };

  const updateBagItem = async (
    bagItemId: number,
    productId: number,
    size: string,
    quantity: number
  ) => {
    try {
      const apiUrl = buildUrlApi({
        path: "/api/bag/update",
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bagId: bag.id,
          bagItemId,
          productId,
          size,
          quantity,
        }),
      });

      if (!response.ok) {
        // const { bagItem, summary } = await response.json();
        toast({
          title: "Error updating your bag.",
          variant: "destructive",
        });
      }
      await mutate();
    } catch (error) {
      console.error("Error updating item from bag:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="font-bold uppercase italic py-6 text-lg md:text-3xl">
          Your bag
        </h1>
        <div className="flex h-full flex-col md:flex-row">
          <div className="md:w-2/3 overflow-y-auto pr-4 py-6 md:pr-6">
            <ul role="list" className="my-6">
              {Array.from({ length: 3 }, (_, index) => (
                <Fragment key={index}>
                  <li className="flex pb-6">
                    <div className="w-24 h-full flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Skeleton className="w-full pb-[133%]" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <Skeleton className="w-64 h-4 mb-3" />
                        <Skeleton className=" mt-1 w-16 h-4" />
                      </div>
                    </div>
                  </li>
                  <Separator className="mb-6" />
                </Fragment>
              ))}
            </ul>
          </div>
          <div className="md:w-1/3 rounded-lg py-6 my-6 md:pl-6">
            <Skeleton className="w-64 h-4 mb-6" />
            <Skeleton className="w-48 h-4 mb-6" />
            <Skeleton className="w-32 h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!bagItems.length) {
    return (
      <div>
        <h1 className="font-bold uppercase italic py-6 text-lg md:text-3xl">
          Your bag
        </h1>
        <div className="flex h-full flex-col md:flex-row">
          <div className="md:w-2/3 py-6 md:pr-6">
            <p>Your bag is empty.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold uppercase italic py-6 text-lg md:text-3xl">
          Your bag
        </h1>
        <div className="flex h-full flex-col lg:flex-row">
          <div className="lg:w-2/3 py-6 lg:pr-6">
            <div className="hidden md:flex pb-4 border-b border-black dark:border-white">
              <div className="font-semibold md:w-3/5 md:min-w-96">Item</div>
              <div className="font-semibold  w-1/6">Price</div>
              <div className="font-semibold flex w-1/2">
                <div className="w-1/2 mr-4 md:mr-6">Size</div>
                <div className="w-1/2">Quantity</div>
              </div>
            </div>
            <ul role="list" className="my-6">
              {bagItems.map((bagItem) => (
                <BagItem
                  key={bagItem.id}
                  bagItem={bagItem}
                  disabled={isValidating}
                  onRemove={removeItemFromBag}
                  onChange={updateBagItem}
                />
              ))}
            </ul>
          </div>
          {!!bagItems.length && (
            <div className="lg:w-1/3 rounded-lg py-6 my-6 lg:pl-6">
              <h2 className="text-xl font-medium pb-6">Order summary</h2>

              <div className="flex justify-between text-base text-sm py-4">
                <p>Subtotal</p>
                <p>{summary.subtotal} €</p>
              </div>
              <Separator />
              <div className="flex justify-between text-base text-sm py-4">
                <p>Shipping estimate</p>
                <p>{summary.shippingFee} €</p>
              </div>
              <Separator />
              <div className="flex justify-between text-base text-sm py-4">
                <p>Tax estimate</p>
                <p>{summary.taxes} €</p>
              </div>
              <Separator />
              <div className="flex justify-between text-base text-sm py-4">
                <p>Discounts</p>
                <p> - {summary.discount} €</p>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold py-4">
                <p>Total</p>
                <p>{summary.total} €</p>
              </div>
              <p className="mt-0.5 text-sm">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bag;
