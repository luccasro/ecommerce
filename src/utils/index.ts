import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const GENDER = ["men", "women", "unisex"];
