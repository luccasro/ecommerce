import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductAdapted } from "@/models";
import { Price } from "../shared/price";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { cn } from "@/utils/cn";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

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
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToBag = () => {
    let data = {
      productId: product.productId.toString(),
      size: selectedSize,
    };

    if (!data.size) {
      return toast({
        description: "Select a size to add the product to your bag",
        variant: "destructive",
      });
    }

    onAddToBag?.(data.productId, data.size);
  };

  return (
    <div
      className={cn("md:w-2/5 w-full lg:ml-8 md:ml-6 md:mt-0 mt-6", className)}
    >
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
          <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"></div>
          <svg
            className="cursor-pointer text-gray-300 dark:text-white"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L1 9"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="py-4 border-b border-gray-200 flex items-center justify-between mb-4">
        <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
          Size
        </p>
        <div className="flex items-center justify-center">
          <ToggleGroup
            type="single"
            variant="outline"
            onValueChange={handleSizeChange}
          >
            {product?.sizes?.map((size, index) => (
              <ToggleGroupItem value={size.value} key={index} className="ml-1">
                <div className="min-w-3"> {size.value}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <div className="flex">
        <div className="mr-2 w-full">
          <Button
            className="h-full w-full py-3 flex"
            onClick={handleAddToBag}
            disabled={disabled}
          >
            <ShoppingCart className="w-6 h-6 mr-2" />
            Add to bag
          </Button>
        </div>
        <div className="w-16">
          <Button
            variant="outline"
            className="h-full w-full py-3 flex border-foreground"
            onClick={onHandleItemWishlist}
            disabled={disabled}
          >
            <Heart
              className={cn(
                "h-8 w-8 stroke-black dark:stroke-white",
                isItemInWishlist && "fill-black dark:fill-white"
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
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are nonrefundable
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
    </div>
  );
};
