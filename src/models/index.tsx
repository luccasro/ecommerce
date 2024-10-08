import {
  Product,
  StyleImages,
  ProductDescriptors,
  MasterCategory,
  SubCategory,
  Size,
  DiscountData,
  Bag,
  BagItem,
  Summary,
  WishlistItem,
  Wishlist,
  User,
} from "@prisma/client";

export interface UserAdapted extends Omit<User, "password"> {}

export interface ProductAdapted extends Product {
  styleImages: StyleImages;
  productDescriptors?: ProductDescriptors;
  masterCategory?: MasterCategory;
  subCategory?: SubCategory;
  sizes?: Size[];
  discountData?: DiscountData;
}
export interface ProductSummary
  extends Pick<
    ProductAdapted,
    | "productId"
    | "productDisplayName"
    | "discountedPrice"
    | "price"
    | "styleImages"
    | "slug"
    | "displayCategories"
  > {}

export interface BagProduct extends ProductSummary {
  baseColour: string;
  sizes: Size[];
}

export interface WishlistProduct extends BagProduct {}

export interface BagItemAdapted extends BagItem {
  product: BagProduct;
}

export interface BagAdapted extends Bag {
  items: BagItemAdapted[];
  summary: Summary;
}

export interface WishlistItemAdapted extends WishlistItem {
  product: WishlistProduct;
}

export interface WishlistAdapted extends Wishlist {
  items: WishlistItemAdapted[];
}

export interface FilterOptions {
  brands: string[];
  sizes: string[];
  colors: string[];
}
