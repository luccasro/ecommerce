import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { getCurrentSession } from "@/utils/server/session/getCurrentSession";
import { accountFormSchema } from "@/schemas/account";

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

    const { name, dateOfBirth: dateOfBirthStr, email, gender } = req.body;

    const dateOfBirth = new Date(dateOfBirthStr);

    const validation = accountFormSchema.safeParse({
      name,
      email,
      gender,
      dateOfBirth,
    });

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.issues });
    }

    // if (!name || !dateOfBirth || !email) {
    //   return res.status(400).json({ error: "Parameters are missing!" });
    // }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name, email, dateOfBirth, gender },
      select: {
        id: true,
        name: true,
        email: true,
        dateOfBirth: true,
        gender: true,
      },
    });

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
