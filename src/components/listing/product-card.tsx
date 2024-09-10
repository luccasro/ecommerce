import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ProductAdapted } from "@/models";
import { Price } from "../shared/price";
import { pageRoutes } from "@/utils/routes";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";
import { Badge } from "../ui/badge";

type ProductCardProps = {
  product: ProductAdapted;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const isSale = product?.discountedPrice < product?.price;

  const { handleItemWishlist, getIsItemInWishlist, isSubmitting } =
    useWishlist();
  const isItemInWishlist = getIsItemInWishlist(product.productId);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <div
        className="relative pb-2 group flex w-full flex-col overflow-hidden rounded-lg border border-background hover:rounded-lg hover:border-foreground"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Link
          className="relative flex overflow-hidden"
          href={`${pageRoutes.product}/${product.slug}`}
        >
          <div
            className={cn(
              "relative pb-[120%] aspect-h-1 aspect-w-1 w-full rounded-b-lg overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7",
              isLoading && "animate-pulse",
              isHover && "rounded-none rounded-t-lg"
            )}
          >
            <Image
              src={product?.styleImages?.default}
              alt={product.productDisplayName}
              onLoadingComplete={handleImageLoad}
              width={0}
              height={0}
              sizes="100vw"
              className={cn(
                "absolute top-0 left-0 h-full w-full object-cover object-center transition-opacity opacity-100",
                isHover && "opacity-0 duration-500"
              )}
            />
            <Image
              src={product?.styleImages?.right}
              alt={product.productDisplayName}
              width={0}
              height={0}
              sizes="100vw"
              className={cn(
                "absolute top-0 left-0 h-full w-full object-cover object-center transition-opacity duration-500 opacity-0",
                isHover && "opacity-100"
              )}
            />
          </div>
        </Link>
        <div className="mt-2 pl-2">
          <Link href={`${pageRoutes.product}/${product.slug}`}>
            <h5 className="text-sm tracking-tight font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
              {product.productDisplayName}
            </h5>
          </Link>
          <h5 className="mt-1 text-sm tracking-tight">
            {product.displayCategories}
          </h5>
          <div className="mt-1 flex items-center justify-between">
            <Price
              className="text-sm font-bold"
              price={product.price}
              discountedPrice={product?.discountedPrice}
            />
          </div>
        </div>
        {isSale && (
          <Link
            className="absolute top-3 left-3"
            href={`${pageRoutes.product}/${product.slug}`}
          >
            <Badge>SALE</Badge>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          disabled={isSubmitting}
          onClick={() => handleItemWishlist(product.productId)}
          className="absolute top-3 right-3 p-0 w-auto h-auto hover:bg-transparent disabled:opacity-100"
        >
          <Heart
            className={cn(
              "w-5 h-5 stroke-primary dark:stroke-primary",
              isItemInWishlist && "fill-primary dark:fill-primary"
            )}
          />
        </Button>
      </div>
    </>
  );
};
