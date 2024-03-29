import { Product, ProductAdapted } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

interface HandlerType {
  error?: string;
  products?: ProductAdapted[];
  totalProducts?: number;
  pages?: number;
}

const prisma = new PrismaClient();

interface DataObject {
  [key: string]: any;
}

function changeIdToUid(obj: DataObject): DataObject {
  if (Array.isArray(obj)) {
    return obj.map(changeIdToUid);
  } else if (typeof obj === "object" && obj !== null) {
    const { id, ...rest } = obj;
    const newObj = { uid: id, ...rest };
    return Object.fromEntries(
      Object.entries(newObj).map(([key, value]) => {
        if (key === "id") {
          return ["productId", value];
        } else {
          return [key, changeIdToUid(value)];
        }
      })
    ) as DataObject;
  } else {
    return obj;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerType>
) {
  const { gender, sort, search, page = 1, pageSize = 12 } = req.query;

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
  let productsJson: any = jsonData.map((json) => changeIdToUid(json.data));

  productsJson = productsJson.map((product: Product) => {
    const { id, uid, lookGoodAlbum, style360Images, ...rest } = product;
    return {
      ...rest,
      articleAttributes: undefined,
      crossLinks: undefined,
      brandUserProfile: undefined,
      articleType: undefined,
      otherFlags: undefined,
      articleDisplayAttr: undefined,
      colours: undefined,
      productId: uid,
      styleImages: {
        create: {
          default: product.styleImages.default?.imageURL || "",
          back: product.styleImages.back?.imageURL || "",
          front: product.styleImages.front?.imageURL || "",
          left: product.styleImages.left?.imageURL || "",
          right: product.styleImages.right?.imageURL || "",
          search: product.styleImages.search?.imageURL || "",
          sizeRepresentation: product.styleImages.size_representation || "",
        },
      },
      masterCategory: {
        create: {
          ...product.masterCategory,
        },
      },
      subCategory: {
        create: {
          ...product.subCategory,
        },
      },
      productDescriptors: {
        create: {
          ...product.productDescriptors.description,
        },
      },
      discountData: {
        create: {
          ...(product?.discountData || {}),
        },
      },
      styleOptions: {
        create: product.styleOptions.map((option) => {
          const { id, ...optionRest } = option;
          return {
            ...optionRest,
          };
        }),
      },
    };
  });

  try {
    const allProducts = await prisma.product.findMany({
      include: {
        styleImages: true,
      },
    });
    const pageIndex: number = Number(page);
    const size: number = Number(pageSize);
    const skip = (pageIndex - 1) * size;

    const products = await prisma.product.findMany({
      include: {
        styleImages: true,
      },
      where: {
        AND: [
          gender
            ? {
                gender: {
                  equals: (gender as string).toLowerCase(),
                  mode: "insensitive",
                },
              }
            : {},
          search
            ? {
                OR: [
                  {
                    productDisplayName: {
                      contains: (search as string).toLowerCase(),
                      mode: "insensitive",
                    },
                  },
                  {
                    variantName: {
                      contains: (search as string).toLowerCase(),
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
        ],
      },
      orderBy:
        sort === "recommended"
          ? { id: "asc" }
          : sort === "low-to-high"
          ? { price: "asc" }
          : sort === "high-to-low"
          ? { price: "desc" }
          : undefined,
      skip,
      take: size,
    });

    await Promise.all(
      productsJson.map(async (product: any, i: number) => {
        if (!allProducts.find((p) => p.productId === product.productId)) {
          console.log("Adding new product at index", i);
          await prisma.product.create({
            data: product,
          });
        }
      })
    );

    //others logic:
    // const pageIndex: number = Number(page);
    // const size: number = Number(pageSize);

    // let filteredProducts: ProductAdapted[] = products;

    // if (gender) {
    //   filteredProducts = filteredProducts.filter(
    //     (product) =>
    //       product.gender.toLowerCase() === (gender as string).toLowerCase()
    //   );
    // }

    // if (search) {
    //   filteredProducts = filteredProducts.filter(
    //     (product) =>
    //       product.productDisplayName
    //         .toLowerCase()
    //         .includes((search as string).toLowerCase()) ||
    //       product.variantName
    //         .toLowerCase()
    //         .includes((search as string).toLowerCase())
    //   );
    // }

    // if (sort) {
    //   if (sort === "recommended") {
    //     filteredProducts = filteredProducts.sort((a, b) => a.id - b.id);
    //   } else if (sort === "low-to-high") {
    //     filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    //   } else if (sort === "high-to-low") {
    //     filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    //   }
    // }

    // // Paginate results
    // const startIndex = (pageIndex - 1) * size;
    // const endIndex = startIndex + size;
    // const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // if (!paginatedProducts.length) {
    //   return res.status(404).json({ error: "Products not found" });
    // }

    const totalProducts = await prisma.product.count({
      where: {
        AND: [
          gender
            ? {
                gender: {
                  equals: (gender as string).toLowerCase(),
                  mode: "insensitive",
                },
              }
            : {},
        ],
      },
    });

    if (!totalProducts || !products.length) {
      return res.status(404).json({ error: "Products not found" });
    }

    res.status(200).json({
      products,
      totalProducts,
      pages: Math.ceil(totalProducts / size),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error loading products" });
  }
}
