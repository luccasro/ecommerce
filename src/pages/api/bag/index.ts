import { ProductAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/products";
import { getProductsQuery } from "@/utils/getProductsQuery";

interface HandlerType {
  error?: string;
  bagItems?: ProductAdapted[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  try {
    const bagItems = await prisma.product.findMany({
      include: {
        styleImages: true,
      },
      where: {
        AND: [
          {
            gender: {
              equals: "Men",
              mode: "insensitive",
            },
          },
        ],
      },
      take: 3,
    });

    if (!bagItems.length) {
      return res.status(404).json({ error: "Products not found" });
    }

    res.status(200).json({
      bagItems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error loading products" });
  }
}
