import { ProductAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getProductsQuery } from "@/utils/getProductsQuery";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { buildUrlApi } from "@/utils/buildUrlApi";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";
import { updateBagSummary } from "@/utils/server/bag/updateBagSummary";

interface HandlerType {
  error?: string;
  bagItem?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  try {
    // const session = await getServerSession(req, res, authOptions);
    const session = await getCurrentSession(req, res);
    const { productId, size } = req.body;
    // console.log("current session: ", session);
    if (!productId || !size)
      return res.status(400).json({ error: "Missing productId or size" });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const user = session.user as any;

    const existingItem = await prisma.bagItem.findFirst({
      where: {
        bagId: user.bag.id,
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

    // const url = buildUrlApi({
    //   path: "/api/bag/update-summary",
    // });

    // const summary = await updateSummary(req, res);
    const summary = updateBagSummary(user.bag.id, user.id, res);
    // const summary2 = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    res.status(200).json({
      bagItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error adding product to bag" });
  }
}
