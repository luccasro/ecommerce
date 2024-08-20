const fs = require("fs");
const path = require("path");
import { createProductSlug } from "../src/utils/createProductSlug";
import { changeIdToUid } from "../src/utils/changeIdToUid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const directoryPath = path.join(process.cwd(), "prisma", "seeds");
  const files = fs.readdirSync(directoryPath);
  const jsonData = files.map((file: any) => {
    const filePath = path.join(directoryPath, file);
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
  });
  let products = jsonData.map((json: any) => changeIdToUid(json.data));

  products = products.map((product: any) => {
    const {
      id,
      uid,
      lookGoodAlbum,
      style360Images,
      articleAttributes,
      crossLinks,
      brandUserProfile,
      articleType,
      otherFlags,
      articleDisplayAttr,
      colours,
      styleOptions,
      isEMIEnabled,
      visualTag,
      myntraRating,
      landingPageUrl,
      ...rest
    } = product;

    const slug = createProductSlug(landingPageUrl);

    return {
      ...rest,
      productId: uid,
      slug,
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
      ...(product?.discountData
        ? {
            discountData: {
              create: {
                ...product.discountData,
                discountText: undefined,
                discountToolTipText: undefined,
              },
            },
          }
        : {}),
      sizes: {
        create: product.styleOptions.map((option: any) => {
          const {
            id,
            skuAvailabilityDetailMap,
            warehouseIdToItemCountMap,
            ...optionRest
          } = option;
          return {
            ...optionRest,
          };
        }),
      },
    };
  });

  try {
    await Promise.all(
      products.map(async (product: any, i: number) => {
        console.log("Adding new product at index", i);
        await prisma.product.upsert({
          where: { productId: product.productId },
          update: {},
          create: product,
        });
      })
    );
  } catch (error) {
    console.error("Error seeding product:", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
