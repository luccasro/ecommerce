import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";
import { WishlistItem } from "@prisma/client";

interface HandlerType {
  error?: string;
  wishlistItem?: WishlistItem;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  try {
    const session = await getCurrentSession(req, res);
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ error: "Missing productId or size" });
    }

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = session.user as any;
    const wishlistId = user.wishlist.id;

    const existingItem = await prisma.wishlistItem.findFirst({
      where: {
        wishlistId,
        productId: Number(productId),
      },
    });

    let wishlistItem;
    if (!!existingItem) {
      return res.status(429).json({ error: "You already have this item!" });
    } else {
      wishlistItem = await prisma.wishlistItem.create({
        data: {
          wishlistId,
          productId: Number(productId),
        },
      });
    }

    res.status(200).json({
      wishlistItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error adding product to bag" });
  }
}
