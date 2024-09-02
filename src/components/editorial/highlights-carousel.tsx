import { buildUrlApi } from "@/utils/buildUrlApi";
import { apiRoutes } from "@/utils/routes";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ProductsCarousel } from "@/components/shared/products-carousel";
import { PageContent } from "../shared/page-content";

export const HighlightsCarousel = () => {
  const url = buildUrlApi({
    path: apiRoutes.products,
    query: {
      pageSize: "5",
    },
  });

  const { data } = useSWR(url, () => fetcher(url), {
    revalidateOnFocus: false,
  });
  const products = data?.products || [];

  return (
    <div className="mx-8">
      <ProductsCarousel title="Highlights" products={products} />
    </div>
  );
};
