import { NextPage } from "next";
import { useMemo } from "react";
import { WishlistItem } from "@/components/wishlist/wishlist-item";
import { useWishlist } from "@/contexts/wishlist-context";
import { RecentlyViewed } from "@/components/shared/recently-viewed";
import { WishlistSkeleton } from "@/components/wishlist/wishlist-skeleton";

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
  const isEmpty = !isLoading && !wishlistItems.length;

  const emptyWishlist = (
    <div>
      <h1 className="font-bold uppercase italic py-6 text-xl md:text-3xl">
        Your wishlist
      </h1>
      <div className="flex h-full flex-col md:flex-row">
        <div className="md:w-2/3 py-6 md:pr-6">
          <p>Your wishlist is empty.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="w-full">
        <h1 className="font-bold uppercase italic py-6 text-xl md:text-3xl">
          Your wishlist
        </h1>
        {isLoading ? (
          <WishlistSkeleton />
        ) : !isEmpty ? (
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
        ) : (
          emptyWishlist
        )}
      </div>
      <RecentlyViewed className="mb-6" />
    </div>
  );
};

export default Wishlist;
