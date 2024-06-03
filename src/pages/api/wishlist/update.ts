import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "PATCH") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const session = await getCurrentSession(req, res);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = session.user as any;
    const wishlistId = user.wishlistId;

    const { wishlistItemId, size } = req.body;

    if (!wishlistItemId || !wishlistId || !size) {
      return res.status(400).json({ error: "Parameters are missing!" });
    }

    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId: wishlistId,
        id: wishlistItemId,
      },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found in the wishlist" });
    }

    const wishlistItem = await prisma.wishlistItem.update({
      where: { wishlistId, id: wishlistItemId },
      data: { size },
    });

    return res.status(200).json({ wishlistItem });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
