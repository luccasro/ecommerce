import { BagAdapted, ProductAdapted, WishlistAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";

interface HandlerType {
  error?: string;
  wishlist?: WishlistAdapted;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  try {
    const session = await getCurrentSession(req, res);

    const user = session?.user as any;

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const wishlist = await prisma.wishlist.findFirst({
      where: { userId: user.id },
      include: {
        items: {
          orderBy: { createdAt: "asc" },
          include: {
            product: {
              include: {
                styleImages: true,
                sizes: true,
              },
            },
          },
        },
      },
    });

    if (!wishlist?.items?.length) {
      return res.status(200).json({ error: "Products not found" });
    }

    res.status(200).json({
      wishlist: wishlist as WishlistAdapted,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error loading products" });
  }
}
