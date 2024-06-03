import { Separator } from "@/components/ui/separator";
import { NextPage } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Fragment, useMemo } from "react";
import { WishlistItem } from "@/components/wishlist/wishlist-item";
import { useWishlist } from "@/contexts/wishlist-context";

const Wishlist: NextPage = () => {
  const {
    wishlist,
    isLoading,
    isSubmitting,
    removeItemFromWishlist,
    updateSizeFromWishlist,
    moveItemToBagFromWishlist,
  } = useWishlist();
  const wishlistItems = useMemo(() => wishlist?.items || [], [wishlist]);

  if (isLoading) {
    return (
      <div>
        <h1 className="font-bold uppercase italic py-6 text-lg md:text-3xl">
          Your wishlist
        </h1>
        <div className="flex h-full flex-col md:flex-row">
          <div className="w-full overflow-y-auto pr-4 py-6 md:pr-6">
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
        </div>
      </div>
    );
  }

  if (!wishlistItems.length) {
    return (
      <div>
        <h1 className="font-bold uppercase italic py-6 text-lg md:text-3xl">
          Your wishlist
        </h1>
        <div className="flex h-full flex-col md:flex-row">
          <div className="md:w-2/3 py-6 md:pr-6">
            <p>Your wishlist is empty.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold uppercase italic py-6 text-xl md:text-3xl">
          Your wishlist
        </h1>
        <div className="flex h-full flex-col lg:flex-row">
          <div className="w-full py-6 lg:pr-6">
            <div className="hidden md:flex pb-4 border-b border-foreground">
              <div className="font-semibold md:w-3/5 md:min-w-96">Item</div>
              <div className="font-semibold flex w-1/2">
                <div className="w-1/2 mr-4 md:mr-6">Price</div>
                <div className="w-1/2 mr-4 md:mr-6">Size</div>
                <div className="w-1/2"></div>
              </div>
            </div>
            <ul role="list" className="my-6">
              {wishlistItems.map((wishlistItem) => (
                <WishlistItem
                  key={wishlistItem.id}
                  wishlistItem={wishlistItem}
                  disabled={isSubmitting}
                  onRemove={removeItemFromWishlist}
                  onSizeChange={updateSizeFromWishlist}
                  onMoveToBag={moveItemToBagFromWishlist}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
