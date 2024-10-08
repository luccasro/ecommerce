import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BagItemAdapted } from "@/models";
import { SizeQuantity } from "@/components/bag/size-quantity";
import { Price } from "../shared/price";
import { X } from "lucide-react";
import { pageRoutes } from "@/utils/routes";

interface BagItemProps {
  bagItem: BagItemAdapted;
  disabled?: boolean;
  onRemove?: (bagItemId: number, productId: number) => void;
  onChange?: (
    bagItemId: number,
    productId: number,
    size: string,
    quantity: number
  ) => void;
}

export const BagItem: React.FC<BagItemProps> = ({
  bagItem,
  disabled,
  onRemove,
  onChange,
}) => {
  const { product, id: bagItemId, size, quantity } = bagItem;

  const handleOnChange = (size: string, quantity: number) => {
    onChange?.(bagItemId, product.productId, size, quantity);
  };

  return (
    <>
      <li className="relative flex flex-col md:flex-row pb-6">
        <div className="flex md:w-3/5 md:min-w-96">
          <div className="w-24 h-full flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <Link href={`${pageRoutes.product}/${product.slug}`}>
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
                <Link
                  className=""
                  href={`${pageRoutes.product}/${product.slug}`}
                >
                  <h3>{product.productDisplayName}</h3>
                </Link>
              </div>
              <div className="mt-1 flex justify-between md:block">
                <p className="text-sm text-gray-500">{product.baseColour}</p>
                <Price
                  className="block md:hidden"
                  price={product.price}
                  discountedPrice={product?.discountedPrice}
                />
              </div>
              <SizeQuantity
                bagItem={product}
                className="flex mt-1 w-full block md:hidden"
                size={size}
                quantity={quantity}
                disabled={disabled}
                onChange={handleOnChange}
              />
            </div>
            {/* <div className="items-end h-full hidden md:flex">
              <Button
                variant="ghost"
                className="font-medium p-0 hover:bg-transparent hover:text-indigo-600"
              >
                Remove
              </Button>
            </div> */}
          </div>
        </div>
        <div className="w-1/5 items-center hidden md:flex">
          <Price
            price={product.price}
            discountedPrice={product?.discountedPrice}
          />
        </div>
        <SizeQuantity
          bagItem={product}
          className="w-1/2 hidden md:flex"
          size={size}
          quantity={quantity}
          disabled={disabled}
          onChange={handleOnChange}
        />
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent absolute top-[-15px] right-0"
          disabled={disabled}
          onClick={() => onRemove?.(bagItemId, product.productId)}
        >
          <X className="w-4 h-4 fill-black dark:fill-white" />
        </Button>
      </li>
      <Separator className="mb-6" />
    </>
  );
};
