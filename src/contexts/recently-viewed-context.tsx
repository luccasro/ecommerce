import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ProductSummary } from "@/models";

interface RecentlyViewedContextType {
  recentlyViewedProducts: ProductSummary[];
  addProductRecentlyViewed: (product: ProductSummary) => void;
}

const RECENTLY_VIEWED_KEY = "recentlyViewed";

const RecentlyViewedContext = createContext<
  RecentlyViewedContextType | undefined
>(undefined);

export const RecentlyViewedProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<
    ProductSummary[]
  >([]);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]"
    );
    setRecentlyViewedProducts(storedProducts);
  }, []);

  const addProductRecentlyViewed = (product: ProductSummary) => {
    const productSummary = {
      productId: product.productId,
      productDisplayName: product.productDisplayName,
      discountedPrice: product.discountedPrice,
      price: product.price,
      styleImages: product.styleImages,
      slug: product.slug,
      displayCategories: product.displayCategories,
    };

    const existingProductIndex = recentlyViewedProducts.findIndex(
      (p) => p.productId === product.productId
    );

    const isItemAlreadyInRecentlyViewed = existingProductIndex !== -1;

    if (isItemAlreadyInRecentlyViewed) {
      recentlyViewedProducts.splice(existingProductIndex, 1);
    }

    recentlyViewedProducts.unshift(productSummary);

    localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(recentlyViewedProducts)
    );
  };

  return (
    <RecentlyViewedContext.Provider
      value={{ recentlyViewedProducts, addProductRecentlyViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyViewed must be used within a RecentlyViewedProvider"
    );
  }
  return context;
};
