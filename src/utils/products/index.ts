import { Product } from "@/models";
import { PrismaClient } from "@prisma/client";
import queryString from "query-string";

type ListingQuery = {
  category?: string;
  gender?: string;
};

export async function getProducts(query?: ListingQuery) {
  const params = queryString.stringify({ ...query });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  let url = `${API_URL}/api/products?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export const prisma = new PrismaClient();
