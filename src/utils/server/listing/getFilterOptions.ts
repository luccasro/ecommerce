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
  const brandNamesQuery = await prisma.product.findMany({
    select: {
      brandName: true,
    },
    where: {
      AND: [pathQuery, searchQuery],
    },
    distinct: ["brandName"],
  });

  const brandNames = brandNamesQuery.map((product) => product.brandName);

  const sizes = await prisma.size.findMany({
    distinct: ["value"],
    where: {
      active: true,
    },
    select: {
      value: true,
    },
  });

  const productSizes = sortSizes(sizes);

  const filterOptions = {
    brands: brandNames,
    sizes: productSizes,
  };

  return filterOptions;
};
