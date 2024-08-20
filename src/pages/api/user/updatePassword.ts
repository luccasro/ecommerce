import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";
import { changePasswordSchema } from "@/schemas/account";
import { hashPassword } from "@/utils/hashPassword";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const session = await getCurrentSession(req, res);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    const validation = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.issues });
    }

    const sessionUser = session.user as any;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: sessionUser.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (user.password !== hashPassword(currentPassword)) {
      return res.status(401).json({ error: "Invalid password" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashPassword(newPassword) },
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
