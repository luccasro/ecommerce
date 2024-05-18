import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { updateBagSummary } from "@/utils/server/bag/updateBagSummary";
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
  const userId = user.id;

  const { bagId, bagItemId, productId } = req.body;

  if (!bagId || !productId) {
    return res
      .status(400)
      .json({ error: "Both bagId and productId must be provided" });
  }

  try {
    const existingItem = await prisma.bagItem.findUnique({
      where: {
        bagId: bagId,
        id: bagItemId,
        productId: Number(productId),
      },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found in the bag" });
    }

    let bagItem;
    if (existingItem.quantity > 1) {
      bagItem = await prisma.bagItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity - 1 },
      });
    } else {
      bagItem = await prisma.bagItem.delete({
        where: { id: existingItem.id },
      });
    }

    const summary = updateBagSummary(existingItem.bagId, userId, res);

    return res.status(200).json({ bagItem, summary });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
