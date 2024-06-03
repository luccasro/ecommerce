import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BagItemAdapted, WishlistItemAdapted } from "@/models";
import { SizeSelector } from "@/components/wishlist/size-selector";
import { Price } from "../shared/price";
import { X } from "lucide-react";
import { pageRoutes } from "@/utils/routes";

interface WishlistItemProps {
  wishlistItem: WishlistItemAdapted;
  disabled?: boolean;
  onRemove?: (wishlistItemId: number, productId: number) => void;
  onSizeChange?: (wishlistItemId: number, size: string) => void;
  onMoveToBag?: (
    wishlistItemId: number,
    productId: number,
    size: string
  ) => void;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({
  wishlistItem,
  disabled,
  onRemove,
  onSizeChange,
  onMoveToBag,
}) => {
  const { product, id: wishlistItemId, size } = wishlistItem;

  const handleOnChange = (size: string) => {
    onSizeChange?.(wishlistItemId, size);
  };

  return (
    <>
      <li className="relative flex flex-col md:flex-row pb-6">
        <div className="flex md:w-3/5 md:min-w-96">
          <div className="w-24 h-full flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <Link href={`${pageRoutes.product}/${product.productId}`}>
              <Image
                src={product.styleImages.default}
                alt={product.productDisplayName}
                className="w-full object-cover object-top"
                width={0}
                height={0}
                sizes="100vw"
              />
            </Link>
          </div>
          <div className="mx-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-sm md:text-base font-medium">
                <Link href={`${pageRoutes.product}/${product.productId}`}>
                  <h3>{product.productDisplayName}</h3>
                </Link>
              </div>
              <div className="mt-2 flex justify-between md:block">
                <p className="text-sm text-gray-500">{product.baseColour}</p>
                <Price
                  className="whitespace-nowrap block md:hidden"
                  price={product.price}
                  discountedPrice={product?.discountedPrice}
                />
              </div>
              <SizeSelector
                product={product}
                wishlistItemId={wishlistItemId}
                size={size as string}
                disabled={disabled}
                onChange={handleOnChange}
                onMoveToBag={onMoveToBag}
              />
            </div>
            <div className="items-end h-full hidden md:flex">
              <Button
                variant="ghost"
                className="font-medium p-0 hover:bg-transparent hover:text-indigo-600"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
        <SizeSelector
          product={product}
          wishlistItemId={wishlistItemId}
          className="w-1/2 hidden md:flex"
          size={size as string}
          disabled={disabled}
          onChange={handleOnChange}
          onMoveToBag={onMoveToBag}
        />
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent absolute top-[-8px] right-0"
          disabled={disabled}
          onClick={() => onRemove?.(wishlistItemId, product.productId)}
        >
          <X className="w-5 h-5 fill-black dark:fill-white" />
        </Button>
      </li>
      <Separator className="mb-6" />
    </>
  );
};
