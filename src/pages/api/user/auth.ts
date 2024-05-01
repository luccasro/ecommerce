import { prisma } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next/types";
import { hashPassword } from "@/utils/hashPassword";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await loginUserHandler(req, res);
  } else {
    return res.status(405);
  }
}

async function loginUserHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "invalid inputs" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        bag: true,
      },
    });
    if (user && user.password === hashPassword(password)) {
      // exclude password from json response
      return res.status(200).json(exclude(user, ["password"]));
    } else {
      return res.status(401).json({ error: "invalid credentials" });
    }
  } catch (e: any) {
    throw new Error(e);
  }
}
// Function to exclude user password returned from prisma
function exclude(user: any, keys: any) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
