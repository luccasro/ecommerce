import { ProductAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";
import { updateBagSummary } from "@/utils/server/bag/updateBagSummary";

interface HandlerType {
  error?: string;
  bagItem?: any;
  summary?: any;
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
    const bagId = user.bag.id;

    const existingItem = await prisma.bagItem.findFirst({
      where: {
        bagId,
        size: size.toString(),
        productId: Number(productId),
      },
    });

    let bagItem;
    if (!!existingItem) {
      bagItem = await prisma.bagItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1, size: size.toString() },
      });
    } else {
      bagItem = await prisma.bagItem.create({
        data: {
          quantity: 1,
          bagId: user.bag.id,
          productId: Number(productId),
          size: size.toString(),
        },
      });
    }

    const summary = await updateBagSummary(user.bag.id, user.id, res);

    res.status(200).json({
      bagItem,
      summary,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error adding product to bag" });
  }
}
