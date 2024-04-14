import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ProductAdapted } from "@/models";

type ProductCardProps = {
  product: ProductAdapted;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="group flex w-full flex-col self-center overflow-hidden">
        <Link
          className="relative flex overflow-hidden"
          href={`/product/${product.productId}`}
        >
          <div
            className={`relative pb-[120%] ${
              isLoading && "animate-pulse"
            } aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ${
              isHovered ? "transition-all delay-1000" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={product?.styleImages?.default}
              alt={product.productDisplayName}
              onLoadingComplete={handleImageLoad}
              width={0}
              height={0}
              sizes="100vw"
              className="absolute top-0 left-0 h-full w-full object-cover object-center group-hover:opacity-75"
            />
            <Image
              src={product?.styleImages?.right}
              alt={product.productDisplayName}
              width={0}
              height={0}
              sizes="100vw"
              className={`absolute top-0 left-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </Link>
        <div className="mt-2">
          <Link href={`/product/${product.id}`}>
            <h5 className="text-sm tracking-tight font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
              {product.productDisplayName}
            </h5>
          </Link>
          <h5 className="mt-1 text-sm tracking-tight">
            {product.displayCategories}
          </h5>
          <div className="mt-1 flex items-center justify-between">
            <p>
              <span className="text-sm font-bold">{product.price} €</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
