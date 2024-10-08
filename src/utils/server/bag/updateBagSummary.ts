import { prisma } from "@/utils";
import { DiscountData } from "@prisma/client";
import { NextApiResponse } from "next";

const DEFAULT_FREE_SHIPPING = 100;
const DEFAULT_SHIPPING = 10;
const DEFAULT_TAX_RATE = 0.1; // 10%

/**
 * Calculate the shipping fee based on the subtotal.
 * @param {number} subtotal - The subtotal amount.
 * @returns {number} - The shipping fee.
 */
function calculateShippingFee(subtotal: number): number {
  return subtotal > DEFAULT_FREE_SHIPPING ? 0 : DEFAULT_SHIPPING;
}

/**
 * Calculate the taxes based on the subtotal.
 * @param {number} subtotal - The subtotal amount.
 * @returns {number} - The calculated taxes.
 */
function calculateTaxes(subtotal: number): number {
  return +(subtotal * DEFAULT_TAX_RATE).toFixed(2);
}

/**
 * Calculate the discounts based on the discount data.
 * @param {DiscountData | null} discountData - The discount data.
 * @returns {number} - The calculated discount amount.
 */
function calculateDiscounts(discountData: DiscountData | null): number {
  if (!discountData || discountData.discountType === 0) return 0;
  return discountData.discountAmount || 0;
}

/**
 * Calculate the summary for a given bag.
 * @param {string} bagId - The ID of the bag.
 * @returns {Promise<{subtotal: string, shippingFee: string, taxes: string, total: string, discount: string} | null>} - The calculated summary or null if the bag is not found.
 */
async function calculateSummary(bagId: string) {
  const bagWithItems = await prisma.bag.findUnique({
    where: { id: bagId },
    include: {
      items: { include: { product: { include: { discountData: true } } } },
    },
  });

  if (!bagWithItems || !bagWithItems.items) {
    return null;
  }

  let subtotal = 0;
  let totalDiscount = 0;

  bagWithItems.items.forEach((item) => {
    const itemDiscount = calculateDiscounts(item?.product?.discountData);
    totalDiscount += itemDiscount * item.quantity;
    subtotal += item.product.discountedPrice * item.quantity;
  });

  const shippingFee = calculateShippingFee(subtotal);
  const taxes = calculateTaxes(subtotal);
  const total = subtotal + taxes + shippingFee;

  return {
    subtotal: subtotal.toFixed(2),
    shippingFee: shippingFee.toFixed(2),
    taxes: taxes.toFixed(2),
    total: total.toFixed(2),
    discount: totalDiscount.toFixed(2),
  };
}

/**
 * Update the bag summary in the database.
 * @param {string} bagId - The ID of the bag.
 * @param {string} userId - The ID of the user.
 * @param {NextApiResponse} res - The API response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
async function updateBagSummary(
  bagId: string,
  userId: string,
  res: NextApiResponse
): Promise<void> {
  if (!bagId) {
    return res.status(400).json({ error: "Bag ID must be provided" });
  }

  try {
    const summary = await calculateSummary(bagId);
    if (!summary) {
      return res.status(404).json({ error: "Bag not found or has no items" });
    }

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
  } catch (error) {
    console.error("Error updating bag summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { updateBagSummary };
