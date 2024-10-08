import { FilterOptions, ProductSummary } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getProductsQuery } from "@/utils/getProductsQuery";
import { getFilterOptions } from "@/utils/server/listing/getFilterOptions";
interface HandlerType {
  error?: string;
  products?: ProductSummary[];
  totalProducts?: number;
  pages?: number;
  filterOptions?: FilterOptions;
}

const DEFAULT_PAGE_SIZE = 12;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  try {
    const { pageSize = DEFAULT_PAGE_SIZE } = req.query;
    const size = Number(pageSize);
    const {
      pathQuery,
      sortQuery,
      searchQuery,
      priceQuery,
      brandsQuery,
      paginationQuery,
      sizesQuery,
      colorsQuery,
      seasonQuery,
      saleQuery,
      ignoredIdsQuery,
    } = getProductsQuery(req.query);

    const allQueries = [
      pathQuery,
      priceQuery,
      brandsQuery,
      searchQuery,
      sizesQuery,
      colorsQuery,
      seasonQuery,
      saleQuery,
      ignoredIdsQuery,
    ];

    const products = await prisma.product.findMany({
      select: {
        productId: true,
        productDisplayName: true,
        discountedPrice: true,
        price: true,
        styleImages: true,
        slug: true,
        displayCategories: true,
      },
      where: {
        AND: allQueries,
      },
      orderBy: sortQuery,
      ...paginationQuery,
    });

    const totalProducts = await prisma.product.count({
      where: {
        AND: allQueries,
      },
    });

    const filterOptions = await getFilterOptions({
      pathQuery,
      searchQuery,
      seasonQuery,
      saleQuery,
    });

    if (!totalProducts || !products.length) {
      return res.status(200).json({
        error: "Products not found",
        products: [],
        totalProducts: 0,
        pages: Math.ceil(totalProducts / size),
        filterOptions,
      });
    }

    res.status(200).json({
      products,
      totalProducts,
      pages: Math.ceil(totalProducts / size),
      filterOptions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error loading products" });
  }
}
