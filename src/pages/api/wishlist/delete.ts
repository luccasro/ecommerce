import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const session = await getCurrentSession(req, res);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = session.user as any;
  const wishlistId = user.wishlist.id;

  const { wishlistItemId, productId } = req.body;

  if (!wishlistId || !productId) {
    return res
      .status(400)
      .json({ error: "Both wishlistId and productId must be provided" });
  }

  try {
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId: wishlistId,
        id: wishlistItemId,
        productId: Number(productId),
      },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found in the wishlist" });
    }

    const wishlistItem = await prisma.wishlistItem.delete({
      where: { id: existingItem.id },
    });

    return res.status(200).json({ wishlistItem });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
