import { ProductAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getProductsQuery } from "@/utils/getProductsQuery";

interface HandlerType {
  error?: string;
  products?: ProductAdapted[];
  totalProducts?: number;
  pages?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  try {
    const { pageSize = 12 } = req.query;
    const size = Number(pageSize);
    const { genderQuery, sortQuery, searchQuery, paginationQuery } =
      getProductsQuery(req.query);

    const products = await prisma.product.findMany({
      include: {
        styleImages: true,
      },
      where: {
        AND: [genderQuery, searchQuery],
      },
      orderBy: sortQuery,
      ...paginationQuery,
    });

    const totalProducts = await prisma.product.count({
      where: {
        AND: [genderQuery, searchQuery],
      },
    });

    if (!totalProducts || !products.length) {
      return res.status(404).json({ error: "Products not found" });
    }

    res.status(200).json({
      products,
      totalProducts,
      pages: Math.ceil(totalProducts / size),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error loading products" });
  }
}
