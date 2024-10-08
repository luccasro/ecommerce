import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WishlistProduct } from "@/models";
import { Price } from "../shared/price";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { AddToBagFormValues, addToBagSchema } from "@/schemas/bag";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface SizeSelectorProduct extends WishlistProduct {}
interface SizeQuantityComponentProps {
  product: SizeSelectorProduct;
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
  const form = useForm<AddToBagFormValues>({
    resolver: zodResolver(addToBagSchema),
    defaultValues: {
      size: size || undefined,
    },
    values: {
      size: size || "",
    },
  });

  const handleOnChangeSize = (field: any, value: string) => {
    onChange?.(value);
    field.onChange(value);
  };

  const submitMoveToBag = (data: AddToBagFormValues) => {
    onMoveToBag?.(wishlistItemId, product.productId, size as string);
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex mt-2 w-full flex items-center md:hidden",
          className
        )}
        onSubmit={form.handleSubmit(submitMoveToBag)}
      >
        <div className="w-1/2 hidden sm:flex flex-col justify-center mr-4 md:mr-6">
          <Price
            className="whitespace-nowrap hidden md:block"
            price={product.price}
            discountedPrice={product?.discountedPrice}
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center mr-4 md:mr-6">
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => handleOnChangeSize(field, value)}
                    disabled={disabled}
                  >
                    <SelectTrigger className="py-6">
                      <FormLabel>
                        <SelectValue placeholder="-" />
                      </FormLabel>
                    </SelectTrigger>
                    <SelectContent>
                      {product?.sizes?.map((size, index) => (
                        <SelectItem value={size.value} key={index}>
                          {size.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <span>
                  <FormMessage className="absolute pt-2" />
                </span>
              </FormItem>
            )}
          />
        </div>
        <div className="w-1/2 flex justify-center">
          <Button
            className="py-6 w-full md:w-auto"
            disabled={disabled}
            type="submit"
          >
            Add to Bag
          </Button>
        </div>
      </form>
    </Form>
  );
};
