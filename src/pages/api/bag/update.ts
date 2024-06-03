import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { updateBagSummary } from "@/utils/server/bag/updateBagSummary";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const session = await getCurrentSession(req, res);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = session.user as any;
  const userId = user.id;
  const bagId = user.bagId;

  const { bagItemId, productId, size, quantity } = req.body;

  if (!bagId || !productId) {
    return res.status(400).json({ error: "Parameters are missing!" });
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

    let updates: any = {};

    if (quantity != existingItem.quantity) {
      updates.quantity = quantity;
    }

    if (existingItem.size !== size) {
      const similarItem = await prisma.bagItem.findFirst({
        where: {
          bagId,
          productId: Number(productId),
          size: size,
          id: { not: existingItem.id },
        },
      });

      if (!!similarItem) {
        const bagItem = await prisma.bagItem.update({
          where: { id: similarItem.id },
          data: {
            quantity: similarItem.quantity + quantity,
          },
        });

        await prisma.bagItem.delete({ where: { id: existingItem.id } });

        const summary = await updateBagSummary(existingItem.bagId, userId, res);

        return res.status(200).json({ bagItem, summary });
      } else {
        updates.size = size;
      }
    }

    if (!Object.keys(updates).length) {
      return res.status(200).json({});
    }

    const bagItem = await prisma.bagItem.update({
      where: { id: existingItem.id },
      data: updates,
    });

    const summary = await updateBagSummary(existingItem.bagId, userId, res);

    return res.status(200).json({ bagItem, summary });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
