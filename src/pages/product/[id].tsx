import { ProductAdapted } from "@/models";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/utils/fetcher";
import { useToast } from "@/components/ui/use-toast";
import { ProductInfo } from "@/components/details/product-info";
import { DetailsSkeleton } from "@/components/details/details-skeleton";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const url = buildUrlApi({
    path: "/api/products",
    query: router.query,
    isQueryPath: true,
  });

  const { data, isLoading, isValidating } = useSWR(url, fetcher, {
    // revalidateOnMount: false,
    // persistData: true,
    // refreshInterval: 3600000,
  });
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = data?.product as ProductAdapted;
  const error = data?.error;

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

  async function addToBag(productId: string, size: string) {
    setIsSubmitting(true);

    try {
      const apiUrl = buildUrlApi({
        path: "/api/bag/add",
      });

      const res = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ productId, size }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        toast({
          description: "Product added to bag",
        });
      }
    } catch (error) {
      console.error("Error adding product to bag:", error);
      toast({
        description: "Error adding product to bag",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  console.log("isValidating", isValidating);

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  return (
    <div>
      <div className="md:flex items-start justify-center py-12">
        <div className="md:w-3/5 w-full md:sticky top-16">
          <div className="flex w-full">
            <div className="w-1/6 mr-2 flex flex-col gap-2">
              {sideImages.map(
                (src, index) =>
                  src && (
                    <Button
                      variant="link"
                      className="h-auto p-0"
                      onMouseEnter={() => handleImageClick(src)}
                      key={index}
                    >
                      <Image
                        className={`w-full ${
                          selectedImage === src &&
                          "border border-2 border-black"
                        }`}
                        alt={product?.productDisplayName}
                        src={src}
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    </Button>
                  )
              )}
            </div>
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
          </div>
        </div>
        <ProductInfo
          product={product}
          disabled={isSubmitting || isValidating}
          onSubmit={addToBag}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
