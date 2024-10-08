import { buildUrlApi } from "@/utils/buildUrlApi";
import { apiRoutes } from "@/utils/routes";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ProductsCarousel } from "@/components/shared/products-carousel";
import { PageContent } from "../shared/page-content";

const DEFAULT_PAGE_SIZE = 12;

interface HighlightsCarouselProps {
  algorithm?: "highlights" | "brand" | "recommendations";
  title?: string;
  className?: string;
  titleClassName?: string;
  productId?: number;
  brands?: string;
  gender?: string;
}

export const HighlightsCarousel: React.FC<HighlightsCarouselProps> = ({
  algorithm = "highlights",
  title = "Highlights",
  className,
  titleClassName,
  productId,
  brands,
  gender,
}) => {
  const getAlgorithmQuery = () => {
    let query: {} = { pageSize: `${DEFAULT_PAGE_SIZE}` };

    if (algorithm === "highlights") {
      query = {
        ...query,
        brands,
        gender,
        ignoredIds: productId ? `${productId}` : undefined,
      };
    }

    return query;
  };

  const query = getAlgorithmQuery();

  const url = buildUrlApi({
    path: apiRoutes.products,
    query,
  });

  const { data } = useSWR(url, () => fetcher(url), {
    revalidateOnFocus: false,
  });

  const products = data?.products || [];

  return (
    <PageContent className={className}>
      <ProductsCarousel
        title={title}
        titleClassName={titleClassName}
        products={products}
      />
    </PageContent>
  );
};
