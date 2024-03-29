import { Product, ProductAdapted } from "@/models";
import { mockProducts } from "@/utils/mockProducts";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/products";

interface HandlerType {
  error?: string;
  product?: ProductAdapted;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  const { id } = req.query;

  const directoryPath = path.join(
    process.cwd(),
    "src",
    "utils",
    "products",
    "mockProducts"
  );
  const files = fs.readdirSync(directoryPath);
  const jsonData = files.map((file) => {
    const filePath = path.join(directoryPath, file);
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
  });
  const products = jsonData.map((product: any) => product.data);

  // const products = mockProducts;

  try {
    // const product = products.filter(
    //   (product) => product.id === Number(id)
    // )?.[0];
    const product = await prisma.product.findUnique({
      where: { productId: Number(id) },
      include: {
        styleImages: true,
        productDescriptors: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product: product as ProductAdapted });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
