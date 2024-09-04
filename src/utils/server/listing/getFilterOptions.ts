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
      baseColour: true,
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

  const colors = productsQuery.map((product) => product.baseColour);

  const uniqueSizes = Array.from(new Set(sizes));

  const productColors = Array.from(new Set(colors));

  const productSizes = sortSizes(uniqueSizes);

  const filterOptions = {
    brands: brandNames,
    sizes: productSizes,
    colors: productColors,
  };

  return filterOptions;
};
