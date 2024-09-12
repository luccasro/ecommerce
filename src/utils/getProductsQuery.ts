import { GENDER } from ".";

const DEFAULT_PAGE_SIZE = 12;

export const getProductsQuery = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const {
    slug,
    sort,
    search,
    price,
    brands,
    sizes,
    colors,
    season,
    gender,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = query;

  const pageIndex = Number(page);
  const size = Number(pageSize);
  const skip = (pageIndex - 1) * size;
  const paginationQuery = { skip, take: size };
  const firstSlug = Array.isArray(slug) ? slug[0] : slug;
  const isGender =
    (firstSlug && GENDER.includes(firstSlug)) ||
    (gender && GENDER.includes(gender as string));
  const genderValue =
    firstSlug && GENDER.includes(firstSlug)
      ? firstSlug
      : gender && GENDER.includes(gender as string)
      ? gender
      : false;
  const isSale = Array.isArray(slug) ? slug.includes("sale") : slug === "sale";

  const pathQuery = isGender
    ? {
        gender: {
          equals: (genderValue as string).toLowerCase(),
          mode: "insensitive",
        },
      }
    : {};

  const saleQuery = isSale
    ? {
        isDiscounted: true,
      }
    : {};

  const searchQuery: Object = search
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
          {
            productId: {
              equals: parseInt(search as string) || 0,
            },
          },
        ],
      }
    : {};

  const priceRange = price ? (price as string).split("-") : [];
  const minPrice = priceRange.length > 0 ? parseInt(priceRange[0]) : undefined;
  const maxPrice = priceRange.length > 1 ? parseInt(priceRange[1]) : undefined;

  const priceQuery: Object =
    minPrice !== undefined && maxPrice !== undefined
      ? {
          discountedPrice: {
            gte: minPrice,
            lte: maxPrice,
          },
        }
      : {};

  const brandNames =
    (Array.isArray(brands)
      ? brands.map((brand: string) => brand.toLowerCase())
      : brands?.toLowerCase().split(",")) || [];

  const brandsQuery: Object =
    brandNames && brandNames.length
      ? {
          brandName: {
            in: brandNames,
            mode: "insensitive",
          },
        }
      : {};

  const productSizes =
    (Array.isArray(sizes)
      ? sizes.map((size: string) => size.toLowerCase())
      : sizes?.toLowerCase().split(",")) || [];

  const sizesQuery: Object =
    productSizes && productSizes.length
      ? {
          sizes: {
            some: {
              value: {
                in: productSizes,
                mode: "insensitive",
              },
            },
          },
        }
      : {};

  const productColors =
    (Array.isArray(colors)
      ? colors.map((color: string) => color.toLowerCase())
      : colors?.toLowerCase().split(",")) || [];

  const colorsQuery: Object =
    productColors && productColors.length
      ? {
          baseColour: {
            in: productColors,
            mode: "insensitive",
          },
        }
      : {};

  const sortQuery: Object =
    sort === "recommended"
      ? { id: "asc" }
      : sort === "low-to-high"
      ? { discountedPrice: "asc" }
      : sort === "high-to-low"
      ? { discountedPrice: "desc" }
      : { id: "asc" };

  const seasonQuery = season
    ? {
        season: {
          equals: season,
          mode: "insensitive",
        },
      }
    : {};

  return {
    pathQuery,
    saleQuery,
    searchQuery,
    priceQuery,
    brandsQuery,
    sizesQuery,
    sortQuery,
    colorsQuery,
    seasonQuery,
    paginationQuery,
  };
};
