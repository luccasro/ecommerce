import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";
import { UserAdapted } from "@/models";

interface HandlerType {
  error?: string;
  user?: UserAdapted;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  try {
    const session = await getCurrentSession(req, res);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userSession = session.user as any;

    const user = await prisma.user.findUnique({
      where: { id: userSession.id },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: true,
        dateOfBirth: true,
        gender: true,
        bagId: true,
        wishlistId: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Error" });
  }
}
