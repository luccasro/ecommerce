import { ProductAdapted } from "@/models";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "../ui/carousel";
import { ProductCard } from "../listing/product-card";

interface ProductCardProps extends CarouselProps {
  products: ProductAdapted[];
}

export const ProductsCarousel = ({
  products = [],
  ...rest
}: ProductCardProps) => {
  if (!products.length) return null;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
      {...rest}
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
