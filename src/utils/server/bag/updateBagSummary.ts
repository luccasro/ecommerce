import { prisma } from "@/utils";
import { DiscountData } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

function calculateShippingFee(subtotal: number): number {
  // Free shipping for orders over $100
  return subtotal > 100 ? 0 : 10;
}

function calculateTaxes(subtotal: number): number {
  // Flat 10% tax rate
  return +(subtotal * 0.1).toFixed(2);
}

function calculateDiscounts(discountData: DiscountData | null): number {
  if (!discountData || discountData.discountType === 0) return 0;

  return discountData.discountAmount || 0;
}

async function calculateSummary(bagId: string) {
  const bagWithItems = await prisma.bag.findUnique({
    where: { id: bagId },
    include: {
      items: { include: { product: { include: { discountData: true } } } },
    },
  });

  if (bagWithItems && bagWithItems.items) {
    let subtotal = 0;
    let totalDiscount = 0;
    bagWithItems.items.forEach((item) => {
      let itemDiscount = calculateDiscounts(item?.product?.discountData);
      totalDiscount += itemDiscount * item.quantity;
      subtotal += item.product.discountedPrice * item.quantity;
    });

    const shippingFee = calculateShippingFee(subtotal);
    const taxes = calculateTaxes(subtotal);
    const total = subtotal + taxes + shippingFee;

    return {
      subtotal: subtotal.toString(),
      shippingFee: shippingFee.toString(),
      taxes: taxes.toString(),
      total: total.toString(),
      discount: totalDiscount.toString(),
    };
  }
  return null;
}

async function updateBagSummary(
  bagId: string,
  userId: string,
  res: NextApiResponse
) {
  if (!bagId) {
    return res.status(400).json({ error: "Bag ID must be provided" });
  }

  const summary = await calculateSummary(bagId);
  if (!summary) {
    return res.status(404).json({ error: "Bag not found or has no items" });
  }

  // Update or create the summary in the database
  const existingSummary = await prisma.summary.findFirst({
    where: { bagId },
  });

  if (existingSummary) {
    await prisma.summary.update({
      where: { id: existingSummary.id },
      data: summary,
    });
  } else {
    const newSummary = await prisma.summary.create({
      data: { ...summary, bagId },
    });

    await prisma.bag.update({
      where: { userId },
      data: { summaryId: newSummary.id },
    });
  }

  res.status(200).json({ summary });
}

export { updateBagSummary };
