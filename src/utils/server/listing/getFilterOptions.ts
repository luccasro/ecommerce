import { prisma } from "@/utils";
import { sortSizes } from "../sortSizes";

interface FilterOptionsQuery {
  pathQuery: {};
  searchQuery: {};
}

export const getFilterOptions = async ({
  pathQuery,
  searchQuery,
}: FilterOptionsQuery) => {
  const productsQuery = await prisma.product.findMany({
    select: {
      brandName: true,
      sizes: true,
    },
    where: {
      AND: [pathQuery, searchQuery],
    },
    distinct: ["brandName"],
  });

  const brandNames = productsQuery.map((product) => product.brandName);

  const sizes = productsQuery.flatMap((product) =>
    product.sizes.map((size) => size.value)
  );

  const uniqueSizes = Array.from(new Set(sizes));

  const productSizes = sortSizes(uniqueSizes);

  const filterOptions = {
    brands: brandNames,
    sizes: productSizes,
  };

  return filterOptions;
};
