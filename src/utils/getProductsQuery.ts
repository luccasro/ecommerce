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
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = query;

  const pageIndex = Number(page);
  const size = Number(pageSize);
  const skip = (pageIndex - 1) * size;
  const paginationQuery = { skip, take: size };
  let pathQuery = {};
  const genderSlug = Array.isArray(slug) ? slug[0] : slug;
  const isGender =
    genderSlug &&
    (genderSlug === "men" || genderSlug === "women" || genderSlug === "unisex");

  if (isGender) {
    pathQuery = {
      gender: {
        equals: (genderSlug as string).toLowerCase(),
        mode: "insensitive",
      },
    };
  }

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

  const sortQuery: Object =
    sort === "recommended"
      ? { id: "asc" }
      : sort === "low-to-high"
      ? { discountedPrice: "asc" }
      : sort === "high-to-low"
      ? { discountedPrice: "desc" }
      : { id: "asc" };

  return {
    pathQuery,
    searchQuery,
    priceQuery,
    brandsQuery,
    sizesQuery,
    sortQuery,
    paginationQuery,
  };
};
