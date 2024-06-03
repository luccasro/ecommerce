import { prisma } from "@/utils";

export const createInitialWishlist = async (userId: string) => {
  const wishlist = await prisma.wishlist.create({
    data: {
      userId: userId,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      wishlistId: wishlistId,
    },
  });

  return { wishlist };
};
