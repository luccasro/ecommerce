import { Prisma } from "@prisma/client";
import { prisma } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next/types";
import { hashPassword } from "@/utils/hashPassword";
import { createInitialBag } from "@/utils/server/bag/createInitialBag";
import { createInitialWishlist } from "@/utils/server/wishlist/createInitialWishlist";
import { registerSchema } from "@/schemas/login";
import { ZodIssue } from "zod";

interface HandlerType {
  user?: any;
  error?: string | string[] | ZodIssue[];
}
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ error: "Method Not allowed" });
  }
}

async function createUserHandler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  const { name, email, password, confirmPassword } = req.body;

  const validation = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.issues });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword(password),
      },
    });

    await createInitialBag(user.id);
    await createInitialWishlist(user.id);

    return res.status(201).json({ user });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
}
