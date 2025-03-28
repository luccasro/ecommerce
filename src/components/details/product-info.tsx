import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProductAdapted } from "@/models";
import { Price } from "../shared/price";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";
import { Heart, ShoppingCart } from "lucide-react";
import { getProductColorStyle } from "@/utils/getProductColorStyle";
import { AddToBagFormValues, addToBagSchema } from "@/schemas/bag";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface ProductInfoProps {
  product: ProductAdapted;
  disabled?: boolean;
  className?: string;
  isItemInWishlist?: boolean;
  onAddToBag?: (productId: string, size: string) => void;
  onHandleItemWishlist?: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  disabled,
  isItemInWishlist,
  onAddToBag,
  onHandleItemWishlist,
  className,
}) => {
  const form = useForm<AddToBagFormValues>({
    resolver: zodResolver(addToBagSchema),
    defaultValues: {
      size: "",
    },
  });

  const colorStyle = getProductColorStyle(product?.baseColour);

  const submitAddToBag = (data: AddToBagFormValues) => {
    onAddToBag?.(product.productId.toString(), data.size);
  };

  return (
    <div
      className={cn("md:w-2/5 w-full lg:ml-8 md:ml-6 md:mt-0 mt-6", className)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitAddToBag)}>
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">
              {product?.brandName}
            </p>
            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white my-2">
              {product?.productDisplayName}
            </h1>
            <Price
              className="text-md font-semibold text-gray-600 dark:text-gray-300"
              price={product.price}
              discountedPrice={product?.discountedPrice}
            />
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
              Colour
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 dark:text-gray-300">
                {product?.baseColour}
              </p>
              {colorStyle && (
                <div
                  className={cn("w-6 h-6 ml-3 mr-4 cursor-pointer", colorStyle)}
                ></div>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="border-b border-gray-200 py-4 mb-4">
                <div className="flex items-center justify-between ">
                  <FormLabel className="text-base leading-4">Size</FormLabel>
                  <div className="flex items-center justify-center">
                    <FormControl>
                      <div className="flex flex-col">
                        <ToggleGroup
                          type="single"
                          variant="outline"
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          {...field}
                        >
                          {product?.sizes?.map((size, index) => (
                            <ToggleGroupItem
                              value={size.value}
                              key={index}
                              className="ml-1"
                            >
                              <FormLabel className="min-w-3">
                                <button type="button">{size.value}</button>
                              </FormLabel>
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </div>
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex">
            <div className="mr-2 w-full">
              <Button
                className="h-full w-full py-3 flex"
                type="submit"
                disabled={disabled}
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                Add to bag
              </Button>
            </div>
            <div className="w-16">
              <Button
                type="button"
                variant="outline"
                className="h-full w-full py-3 flex border-foreground border-input"
                onClick={onHandleItemWishlist}
                disabled={disabled}
              >
                <Heart
                  className={cn(
                    "h-8 w-8 stroke-primary dark:stroke-white",
                    isItemInWishlist && "fill-primary dark:fill-white"
                  )}
                />
              </Button>
            </div>
          </div>
          <div className="py-4 mt-7">
            <Accordion type="single" defaultValue="description" collapsible>
              <AccordionItem
                className="border-gray-200 border-t"
                value="description"
              >
                <AccordionTrigger className="text-md font-bold text-gray-800 dark:text-gray-300">
                  Description
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: product?.productDescriptors?.value as string,
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem className=" border-gray-200" value="shipping">
                <AccordionTrigger className="text-md font-bold text-gray-800 dark:text-gray-300">
                  Shipping and returns
                </AccordionTrigger>
                <AccordionContent>
                  You will be responsible for paying for your own shipping costs
                  for returning your item. Shipping costs are nonrefundable
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem className=" border-gray-200" value="contact">
                <AccordionTrigger className="text-md font-bold text-gray-800 dark:text-gray-300">
                  Contact us
                </AccordionTrigger>
                <AccordionContent>
                  If you have any questions on how to return your item to us,
                  contact us.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </form>
      </Form>
    </div>
  );
};
