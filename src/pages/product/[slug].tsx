import { ProductAdapted } from "@/models";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { useToast } from "@/components/ui/use-toast";
import { ProductInfo } from "@/components/details/product-info";
import { DetailsSkeleton } from "@/components/details/details-skeleton";
import { ImagesSelector } from "@/components/details/image-selector";
import { apiRoutes } from "@/utils/routes";
import { useWishlist } from "@/contexts/wishlist-context";
import { useBag } from "@/contexts/bag-contex";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const url = buildUrlApi({
    path: apiRoutes.products,
    query: router.query,
    isQueryPath: true,
  });

  const { getIsItemInWishlist, handleItemWishlist } = useWishlist();
  const { addToBag, isSubmitting } = useBag();

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
  }, [product]);

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
    return <p>{error}</p>;
  }

  if (!product && !isLoading) {
    return <p>Product not found</p>;
  }

  const handleImageClick = (imageURL: string) => {
    setSelectedImage(imageURL);
  };

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  return (
    <div>
      <div className="md:flex items-start justify-center py-12">
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
    </div>
  );
};

export default ProductDetails;
