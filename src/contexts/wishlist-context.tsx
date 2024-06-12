import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import useSWR from "swr";
import axios from "axios";
import { WishlistAdapted } from "@/models";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { apiRoutes } from "@/utils/routes";
import { useToast } from "@/components/ui/use-toast";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";

interface WishlistContextType {
  wishlist?: WishlistAdapted;
  isLoading: boolean;
  isSubmitting: boolean;
  totalItems: number;
  addItemToWishlist: (productId: number) => Promise<void>;
  removeItemFromWishlist: (itemId: number) => Promise<void>;
  handleItemWishlist: (productId: number) => void;
  getIsItemInWishlist: (productId: number) => boolean;
  getWishlistItemId: (productId: number) => number | undefined;
  updateSizeFromWishlist: (
    wishlistItemId: number,
    size: string
  ) => Promise<void>;
  moveItemToBagFromWishlist: (
    wishlistItemId: number,
    productId: number,
    size: string
  ) => void;
  loadWishlist: () => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    apiRoutes.wishlist.index,
    fetcher,
    {
      revalidateOnMount: status === "authenticated",
      revalidateOnFocus: false,
    }
  );

  const loadWishlist = useCallback(async () => {
    await mutate();
  }, [mutate]);

  useEffect(() => {
    async function fetchData() {
      if (status === "authenticated" && !data) {
        loadWishlist();
      }
    }
    fetchData();
  }, [status, data, mutate, loadWishlist]);

  const wishlist: WishlistAdapted = data?.wishlist;
  const totalItems = wishlist?.items?.length || 0;

  const getIsItemInWishlist = (productId: number) => {
    return wishlist?.items?.some(
      (item) => item.product.productId === productId
    );
  };

  const getWishlistItemId = (productId: number) => {
    return wishlist?.items?.find((item) => item.product.productId === productId)
      ?.id;
  };

  const handleItemWishlist = (productId: number) => {
    const isItemInWishlist = getIsItemInWishlist(productId);
    if (isItemInWishlist) {
      const wishlistItemId = getWishlistItemId(productId) as number;
      removeItemFromWishlist(wishlistItemId);
    } else {
      addItemToWishlist(productId);
    }
  };

  const addItemToWishlist = async (productId: number) => {
    try {
      setIsSubmitting(true);
      const apiUrl = buildUrlApi({
        path: apiRoutes.wishlist.add,
      });
      await axios.post(apiUrl, { productId });
      toast({
        title: "Item added to wishlist.",
      });

      await mutate();
    } catch (error) {
      toast({
        title: "Error adding item to wishlist.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeItemFromWishlist = async (wishlistItemId: number) => {
    try {
      setIsSubmitting(true);
      const apiUrl = buildUrlApi({
        path: apiRoutes.wishlist.delete,
        query: { wishlistItemId: `${wishlistItemId}` },
      });
      await axios.delete(apiUrl);
      toast({
        title: "Item removed from wishlist.",
      });

      const updatedWishlist = {
        ...wishlist,
        items: wishlist?.items?.filter((item) => item.id !== wishlistItemId),
      };
      await mutate({ ...data, wishlist: updatedWishlist });
    } catch (error) {
      toast({
        title: "Error removing item from wishlist.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSizeFromWishlist = async (
    wishlistItemId: number,
    size: string
  ) => {
    try {
      setIsSubmitting(true);
      const apiUrl = buildUrlApi({
        path: apiRoutes.wishlist.update,
      });
      await axios.patch(apiUrl, { wishlistItemId, size });

      const updatedWishlist = {
        ...wishlist,
        items: wishlist?.items?.map((item) =>
          item.id === wishlistItemId ? { ...item, size } : item
        ),
      };

      await mutate({ data, wishlist: updatedWishlist });
    } catch (error) {
      toast({
        title: "Error updating size item.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveItemToBagFromWishlist = async (
    wishlistItemId: number,
    productId: number,
    size: string
  ) => {
    try {
      if (!size) {
        return toast({
          title: "Please select a size.",
          variant: "destructive",
        });
      }
      setIsSubmitting(true);
      const apiUrl = buildUrlApi({
        path: apiRoutes.wishlist.delete,
        query: { wishlistItemId: `${wishlistItemId}` },
      });

      const apiUrlBag = buildUrlApi({
        path: apiRoutes.bag.add,
      });

      await axios.post(apiUrlBag, { productId, size });

      await axios.delete(apiUrl);
      toast({
        title: "Item moved to bag.",
      });
      const updatedWishlist = {
        ...wishlist,
        items: wishlist?.items?.filter((item) => item.id !== wishlistItemId),
      };
      await mutate({ ...data, wishlist: updatedWishlist });
    } catch (error) {
      toast({
        title: "Error moving item to bag.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        isSubmitting,
        totalItems,
        addItemToWishlist,
        removeItemFromWishlist,
        handleItemWishlist,
        updateSizeFromWishlist,
        moveItemToBagFromWishlist,
        getIsItemInWishlist,
        getWishlistItemId,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
