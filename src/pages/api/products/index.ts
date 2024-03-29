import { ProductAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/products";

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
  const { gender, sort, search, page = 1, pageSize = 12 } = req.query;

  console.log("oi");
  try {
    const pageIndex: number = Number(page);
    const size: number = Number(pageSize);
    const skip = (pageIndex - 1) * size;

    const products = await prisma.product.findMany({
      include: {
        styleImages: true,
      },
      where: {
        AND: [
          gender
            ? {
                gender: {
                  equals: (gender as string).toLowerCase(),
                  mode: "insensitive",
                },
              }
            : {},
          search
            ? {
                OR: [
                  {
                    productDisplayName: {
                      contains: (search as string).toLowerCase(),
                      mode: "insensitive",
                    },
                  },
                  {
                    variantName: {
                      contains: (search as string).toLowerCase(),
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
        ],
      },
      orderBy:
        sort === "recommended"
          ? { id: "asc" }
          : sort === "low-to-high"
          ? { price: "asc" }
          : sort === "high-to-low"
          ? { price: "desc" }
          : { id: "asc" },
      skip,
      take: size,
    });

    const totalProducts = await prisma.product.count({
      where: {
        AND: [
          gender
            ? {
                gender: {
                  equals: (gender as string).toLowerCase(),
                  mode: "insensitive",
                },
              }
            : {},
        ],
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
