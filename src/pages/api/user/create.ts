import { Prisma } from "@prisma/client";
import { prisma } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next/types";
import { hashPassword } from "@/utils/hashPassword";
import { createInitialBag } from "@/utils/server/bag/createInitialBag";

interface HandlerType {
  user?: any;
  error?: string;
  errors?: string[];
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
  let errors = [];
  const { name, email, password } = req.body;

  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return res.status(400).json({ errors });
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
    return res.status(201).json({ user });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
}
