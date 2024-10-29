import { ProductAdapted } from "@/models";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { ProductInfo } from "@/components/details/product-info";
import { DetailsSkeleton } from "@/components/details/details-skeleton";
import { ImagesSelector } from "@/components/details/image-selector";
import { apiRoutes, pageRoutes } from "@/utils/routes";
import { useWishlist } from "@/contexts/wishlist-context";
import { useBag } from "@/contexts/bag-contex";
import { HighlightsCarousel } from "@/components/editorial/highlights-carousel";
import { useRecentlyViewed } from "@/contexts/recently-viewed-context";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const url = buildUrlApi({
    path: apiRoutes.products,
    query: router.query,
    isQueryPath: true,
  });

  const { getIsItemInWishlist, handleItemWishlist } = useWishlist();
  const { addToBag, isSubmitting } = useBag();
  const { addProductRecentlyViewed } = useRecentlyViewed();

  const { data, isLoading, isValidating } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: !!router.query?.slug,
  });
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const product = data?.product as ProductAdapted;
  const error = data?.error;
  const isItemInWishlist = getIsItemInWishlist(product?.productId);

  useEffect(() => {
    if (!product) return;
    setSelectedImage(product?.styleImages?.default);
    addProductRecentlyViewed(product);
  }, [addProductRecentlyViewed, product]);

  useEffect(() => {
    if (!product && !isLoading) {
      router.push(pageRoutes.notFound);
    }
  }, [error, isLoading, product, router]);

  const sideImages = useMemo(
    () => [
      product?.styleImages?.default,
      product?.styleImages?.back,
      product?.styleImages?.front,
      product?.styleImages?.right,
    ],
    [product]
  );

  if (error) {
    console.log("Error fetching product:", error);
    return <p>An error has ocurred.</p>;
  }

  const handleImageClick = (imageURL: string) => {
    setSelectedImage(imageURL);
  };

  if (isLoading || !product) {
    return <DetailsSkeleton />;
  }

  return (
    <div className="py-12">
      <div className="md:flex items-start justify-center">
        <div className="md:w-3/5 w-full md:sticky top-16">
          <div className="flex flex-col sm:flex-row w-full">
            <ImagesSelector
              sideImages={sideImages}
              alt={product?.productDisplayName}
              onSelectImage={handleImageClick}
              className="hidden sm:flex"
            />
            <div className="w-full">
              <Image
                className="w-full"
                alt={product?.productDisplayName}
                src={selectedImage || product?.styleImages?.default}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
            <ImagesSelector
              sideImages={sideImages}
              alt={product?.productDisplayName}
              onSelectImage={handleImageClick}
              className="sm:hidden w-full mt-4"
            />
          </div>
        </div>
        <ProductInfo
          product={product}
          disabled={isSubmitting || isValidating}
          onAddToBag={addToBag}
          onHandleItemWishlist={() => handleItemWishlist(product.productId)}
          isItemInWishlist={isItemInWishlist}
        />
      </div>
      <hr className="my-8 dark:border-white" />
      {!isLoading && (
        <HighlightsCarousel
          algorithm="highlights"
          title="You may also like"
          productId={product?.productId}
          brands={product?.brandName}
          gender={product?.gender}
          className="mx-0"
          titleClassName="text-md md:text-xl lg:text-xl"
        />
      )}
    </div>
  );
};

export default ProductDetails;
