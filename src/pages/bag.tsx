import { Separator } from "@/components/ui/separator";
import { NextPage } from "next";
import Link from "next/link";
import { BagItem } from "@/components/bag/bag-item";
import { Button } from "@/components/ui/button";
import { useBag } from "@/contexts/bag-contex";
import { RecentlyViewed } from "@/components/shared/recently-viewed";
import { BagSkeleton } from "@/components/bag/bag-skeleton";

const Bag: NextPage = () => {
  const { bag, isLoading, isSubmitting, removeItemFromBag, updateBagItem } =
    useBag();
  const bagItems = bag?.items || [];
  const summary = bag?.summary;
  const isEmpty = !isLoading && !bagItems.length;

  const emptyBag = (
    <div className="flex h-full flex-col md:flex-row">
      <div className="md:w-2/3 py-6 md:pr-6">
        <p>Your bag is empty.</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold uppercase italic py-6 text-lg md:text-3xl">
          Your bag
        </h1>
        {isLoading ? (
          <BagSkeleton />
        ) : !isEmpty ? (
          <div className="flex h-full flex-col mb-12 sm:mb-6 lg:flex-row">
            <div className="lg:w-2/3 py-6 lg:pr-6">
              <div className="hidden md:flex pb-4 border-b border-foreground">
                <div className="font-semibold md:w-3/5 md:min-w-96">Item</div>
                <div className="font-semibold  w-1/5">Price</div>
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
                    disabled={isSubmitting}
                    onRemove={removeItemFromBag}
                    onChange={updateBagItem}
                  />
                ))}
              </ul>
            </div>
            {!!bagItems.length && summary && (
              <div className="lg:w-1/3 rounded-lg mt-6 lg:pl-6">
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
                  <Button asChild className="text-base font-medium">
                    <Link href="#" className="w-full py-6 px-6">
                      Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          emptyBag
        )}
      </div>
      <RecentlyViewed className="mb-6" />
    </div>
  );
};

export default Bag;
