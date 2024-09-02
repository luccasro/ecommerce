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
import { BagAdapted, WishlistAdapted } from "@/models";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { apiRoutes, pageRoutes } from "@/utils/routes";
import { useToast } from "@/components/ui/use-toast";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { useRouter } from "next/navigation";

interface WishlistContextType {
  bag?: BagAdapted;
  isLoading: boolean;
  isSubmitting: boolean;
  totalProducts: number;
  addToBag: (productId: string, size: string) => void;
  updateBagItem: (
    bagItemId: number,
    productId: number,
    size: string,
    quantity: number
  ) => void;
  removeItemFromBag: (bagItemId: number, productId: number) => void;
  openMinibag: boolean;
  closeMinibag: () => void;
  loadBag: () => void;
}

export const BagContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const BagProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const { isLoading: isLoadingSession, isAuthenticated } =
    getSessionStatus(status);
  const router = useRouter();

  const { data, isLoading, mutate } = useSWR(apiRoutes.bag.index, fetcher, {
    revalidateOnMount: status === "authenticated",
    revalidateOnFocus: false,
  });

  const loadBag = useCallback(async () => {
    await mutate();
  }, [mutate]);

  useEffect(() => {
    async function fetchData() {
      if (!isLoadingSession && isAuthenticated && !data) {
        loadBag();
      }
    }
    fetchData();
  }, [isAuthenticated, isLoadingSession, data, mutate, loadBag]);

  const bag: BagAdapted = data?.bag;
  const totalProducts = data?.totalProducts;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openMinibag, setOpenMinibag] = useState(false);

  const closeMinibag = () => {
    setOpenMinibag(false);
  };

  const addToBag = async (productId: string, size: string) => {
    if (!isAuthenticated) {
      router.push(pageRoutes.login);
      return;
    }

    try {
      setIsSubmitting(true);
      const apiUrl = buildUrlApi({
        path: apiRoutes.bag.add,
      });
      await axios.post(apiUrl, { productId, size });
      // toast({
      //   description: "Product added to bag",
      // });

      await mutate();
      setOpenMinibag(true);
    } catch (error) {
      toast({
        description: "Error adding product to bag",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateBagItem = async (
    bagItemId: number,
    productId: number,
    size: string,
    quantity: number
  ) => {
    try {
      setIsSubmitting(true);
      const apiUrl = buildUrlApi({
        path: apiRoutes.bag.update,
      });

      await axios.patch(apiUrl, {
        bagItemId,
        productId,
        size,
        quantity,
      });
      await mutate();
    } catch (error) {
      toast({
        title: "Error updating your bag.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeItemFromBag = async (bagItemId: number, productId: number) => {
    try {
      setIsSubmitting(true);
      const apiUrl = buildUrlApi({
        path: apiRoutes.bag.delete,
        query: { bagItemId: `${bagItemId}`, productId: `${productId}` },
      });

      await axios.delete(apiUrl);

      const updatedBag = {
        ...bag,
        totalProducts: totalProducts - 1,
        items: bag?.items?.filter((item) => item.id !== bagItemId),
      };

      await mutate({ ...data, bag: updatedBag });

      toast({
        title: "Item removed from bag.",
      });
    } catch (error) {
      toast({
        title: "Error removing item from bag.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BagContext.Provider
      value={{
        bag,
        isLoading,
        isSubmitting,
        totalProducts,
        addToBag,
        updateBagItem,
        removeItemFromBag,
        openMinibag,
        closeMinibag,
        loadBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};

export const useBag = (): WishlistContextType => {
  const context = useContext(BagContext);
  if (context === undefined) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
};
