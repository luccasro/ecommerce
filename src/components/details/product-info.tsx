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
import { WishlistIcon } from "../icons/wishlist";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: ProductAdapted;
  disabled?: boolean;
  className?: string;
  onSubmit?: (productId: string, size: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  disabled,
  onSubmit,
  className,
}) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let data = {
      productId: product.productId.toString(),
      size: formData.get("size") as string,
    };

    if (!data.size) {
      return toast({
        description: "Select a size to add to bag",
        variant: "destructive",
      });
    }

    onSubmit?.(data.productId, data.size); // Fix: Pass both productId and size as separate arguments
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
        <p className="text-md font-semibold text-gray-600 dark:text-gray-300 ">
          <Price
            price={product.price}
            discountedPrice={product?.discountedPrice}
          />
        </p>
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
          <ToggleGroup type="single" variant="outline">
            {product?.sizes?.map((size, index) => (
              <ToggleGroupItem value={size.value} key={index} className="ml-1">
                <div className="min-w-3"> {size.value}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <Select name="size">
            <SelectTrigger className="w-full rounded-none border-black dark:border-white border py-6">
              <SelectValue placeholder="Choose your size" />
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
        <div className="flex">
          <div className="mr-2 w-full">
            <Button
              className="h-full w-full py-3 flex rounded-none"
              type="submit"
              disabled={disabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to bag
            </Button>
          </div>
          <div className="w-16">
            <Button
              variant="outline"
              className="h-full w-full py-3 flex border-black dark:border-white rounded-none"
              disabled={disabled}
            >
              {/* <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-labelledby="wishlist-:R4k:"
                    className="h-6 w-6"
                    focusable="false"
                    aria-hidden="false"
                    role="img"
                  >
                    <title id="wishlist-:R4k:">Wishlist</title>
                    <path d="M17.488 1.11h-.146a6.552 6.552 0 0 0-5.35 2.81A6.57 6.57 0 0 0 6.62 1.116 6.406 6.406 0 0 0 .09 7.428c0 7.672 11.028 15.028 11.497 15.338a.745.745 0 0 0 .826 0c.47-.31 11.496-7.666 11.496-15.351a6.432 6.432 0 0 0-6.42-6.306zM12 21.228C10.018 19.83 1.59 13.525 1.59 7.442c.05-2.68 2.246-4.826 4.934-4.826h.088c2.058-.005 3.93 1.251 4.684 3.155.226.572 1.168.572 1.394 0 .755-1.907 2.677-3.17 4.69-3.16h.02c2.7-.069 4.96 2.118 5.01 4.817 0 6.089-8.429 12.401-10.41 13.8z"></path>
                  </svg> */}
              <WishlistIcon strokeWidth="3" className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </form>
      <div className="py-4 mt-7">
        <Accordion type="single" defaultValue="description" collapsible>
          <AccordionItem
            className="border-gray-200 border-t"
            value="description"
          >
            <AccordionTrigger className="text-base leading-4 text-gray-800 dark:text-gray-300">
              Product Details
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
            <AccordionTrigger className="text-base leading-4 text-gray-800 dark:text-gray-300">
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
            <AccordionTrigger className="text-base leading-4 text-gray-800 dark:text-gray-300">
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
