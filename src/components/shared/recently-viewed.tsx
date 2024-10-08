import { ProductsCarousel } from "@/components/shared/products-carousel";
import { useRecentlyViewed } from "@/contexts/recently-viewed-context";

type RecentlyViewedProps = {
  className?: string;
};

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  className,
}) => {
  const { recentlyViewedProducts } = useRecentlyViewed();

  return (
    <div className={className}>
      <ProductsCarousel
        title={"Recently Viewed"}
        titleClassName="text-md md:text-xl lg:text-xl"
        products={recentlyViewedProducts}
      />
    </div>
  );
};
