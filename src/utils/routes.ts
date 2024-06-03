export const apiRoutes = {
  bag: {
    add: "/api/bag/add",
    delete: "/api/bag/delete",
    index: "/api/bag",
    update: "/api/bag/update",
  },
  auth: {
    nextAuth: "/api/auth/[...nextauth]",
  },
  products: "/api/products",
  user: {
    auth: "/api/user/auth",
    create: "/api/user/create",
  },
  wishlist: {
    add: "/api/wishlist/add",
    delete: "/api/wishlist/delete",
    index: "/api/wishlist",
    update: "/api/wishlist/update",
  },
};

export const pageRoutes = {
  home: "/",
  bag: "/bag",
  wishlist: "/wishlist",
  login: "/login",
  product: "/product",
  shopping: "/shopping",
  notFound: "/not-found",
};
