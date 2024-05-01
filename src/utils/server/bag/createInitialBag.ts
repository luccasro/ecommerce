import { prisma } from "@/utils";

export const createInitialBag = async (userId: string) => {
  // Create a new bag for the user
  const bag = await prisma.bag.create({
    data: {
      userId: userId,
    },
  });

  // Create a summary for the bag
  const summary = await prisma.summary.create({
    data: {
      subtotal: "0",
      shippingFee: "0",
      total: "0",
      taxes: "0",
      discount: "0",
      bagId: bag.id,
    },
  });

  // Update the bag with the summary's ID
  await prisma.bag.update({
    where: { id: bag.id },
    data: {
      summaryId: summary.id,
    },
  });

  // Update the user's bag ID
  await prisma.user.update({
    where: { id: userId },
    data: {
      bagId: bag.id,
    },
  });

  return { bag, summary };
};
