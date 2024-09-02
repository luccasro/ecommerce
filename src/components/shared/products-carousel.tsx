import { ProductAdapted } from "@/models";
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

interface ProductCardProps extends CarouselProps {
  products: ProductAdapted[];
  title?: string;
}

export const ProductsCarousel = ({
  products = [],
  title,
  ...rest
}: ProductCardProps) => {
  if (!products.length) return null;

  return (
    <div className="md:px-8">
      {title && (
        <h1 className="font-bold uppercase italic pb-6 text-xl md:text-2xl lg:text-3xl">
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
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-[40%]" />
        <CarouselNext className="top-[40%]" />
        <CarouselPagination />
      </Carousel>
    </div>
  );
};
