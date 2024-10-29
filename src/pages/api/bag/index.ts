import { BagAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";

interface HandlerType {
  error?: string;
  bag?: BagAdapted;
  totalProducts?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  try {
    const session = await getCurrentSession(req, res);

    const user = session?.user as any;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const bag = await prisma.bag.findFirst({
      where: { userId: user.id },
      include: {
        items: {
          orderBy: { createdAt: "asc" },
          include: {
            product: {
              select: {
                productId: true,
                productDisplayName: true,
                discountedPrice: true,
                price: true,
                baseColour: true,
                slug: true,
                displayCategories: true,
                styleImages: true,
                sizes: true,
              },
            },
          },
        },
        summary: true,
      },
    });

    if (!bag?.items?.length) {
      return res.status(200).json({ error: "Products not found" });
    }

    const totalProducts = bag.items
      .map((item) => item.quantity)
      .reduce((a, b) => a + b, 0);

    res.status(200).json({
      bag: bag as BagAdapted,
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error loading products" });
  }
}
