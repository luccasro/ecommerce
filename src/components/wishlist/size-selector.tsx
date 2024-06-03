import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductAdapted } from "@/models";
import { Price } from "../shared/price";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";

interface SizeQuantityComponentProps {
  product: ProductAdapted;
  wishlistItemId: number;
  size?: string | null;
  disabled?: boolean;
  className?: string;
  onChange?: (size: string) => void;
  onMoveToBag?: (
    wishlistItemId: number,
    productId: number,
    size: string
  ) => void;
}

export const SizeSelector: React.FC<SizeQuantityComponentProps> = ({
  product,
  wishlistItemId,
  size,
  disabled,
  className,
  onChange,
  onMoveToBag,
}) => {
  const handleOnChangeSize = (value: string) => {
    onChange?.(value);
  };

  return (
    <div
      className={cn("flex mt-2 w-full flex items-center md:hidden", className)}
    >
      <div className="w-1/2 hidden sm:flex flex-col justify-center mr-4 md:mr-6">
        <Price
          className="whitespace-nowrap hidden md:block"
          price={product.price}
          discountedPrice={product?.discountedPrice}
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center mr-4 md:mr-6">
        <Select
          defaultValue={size || undefined}
          value={size || undefined}
          onValueChange={handleOnChangeSize}
          disabled={disabled}
        >
          <SelectTrigger className="py-6">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            {product?.sizes?.map((size, index) => (
              <SelectItem value={size.value} key={index}>
                <div> {size.value}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/2 flex justify-center">
        <Button
          className="py-6 w-full md:w-auto"
          disabled={disabled}
          onClick={() =>
            onMoveToBag?.(wishlistItemId, product.productId, size as string)
          }
        >
          Add to Bag
        </Button>
      </div>
    </div>
  );
};
