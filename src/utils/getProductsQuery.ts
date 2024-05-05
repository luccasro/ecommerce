export const getProductsQuery = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const { gender, sort, search, page = 1, pageSize = 12 } = query;

  const pageIndex = Number(page);
  const size = Number(pageSize);
  const skip = (pageIndex - 1) * size;
  const paginationQuery = { skip, take: size };

  const genderQuery: Object = gender
    ? {
        gender: {
          equals: (gender as string).toLowerCase(),
          mode: "insensitive",
        },
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

  const sortQuery: Object =
    sort === "recommended"
      ? { id: "asc" }
      : sort === "low-to-high"
      ? { discountedPrice: "asc" }
      : sort === "high-to-low"
      ? { discountedPrice: "desc" }
      : { id: "asc" };

  return { genderQuery, searchQuery, sortQuery, paginationQuery };
};
