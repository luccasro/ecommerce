import { ProductAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/products";

interface HandlerType {
  error?: string;
  product?: ProductAdapted;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  const { id } = req.query;

  try {
    const product = (await prisma.product.findUnique({
      where: { productId: Number(id) },
      include: {
        styleImages: true,
        productDescriptors: true,
      },
    })) as ProductAdapted;

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
