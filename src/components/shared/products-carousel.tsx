import { ProductSummary } from "@/models";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
  CarouselProps,
} from "../ui/carousel";
import { ProductCard } from "../listing/product-card";
import { cn } from "@/utils/cn";

interface ProductCardProps extends CarouselProps {
  products: ProductSummary[];
  title?: string;
  titleClassName?: string;
}

export const ProductsCarousel = ({
  products = [],
  title,
  titleClassName,
  ...rest
}: ProductCardProps) => {
  const productsLength = products.length;

  if (!productsLength) return null;

  return (
    <div className={cn(productsLength > 4 && "lg:px-8")}>
      {title && (
        <h1
          className={cn(
            "font-bold uppercase italic pb-6 text-xl md:text-2xl lg:text-3xl",
            titleClassName
          )}
        >
          {title}
        </h1>
      )}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
        {...rest}
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "basis-1/2 sm:basis-1/3 lg:basis-1/3",
                productsLength >= 4 && "lg:basis-1/4"
              )}
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn(
            "top-[40%] hidden lg:inline-flex",
            productsLength <= 4 && "lg:hidden"
          )}
        />
        <CarouselNext
          className={cn(
            "top-[40%] hidden lg:inline-flex",
            productsLength <= 4 && "lg:hidden"
          )}
        />
        <CarouselPagination
          className={cn(
            productsLength <= 3 && "md:hidden",
            productsLength <= 4 && "lg:hidden"
          )}
        />
      </Carousel>
    </div>
  );
};
