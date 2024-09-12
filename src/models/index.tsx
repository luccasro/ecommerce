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
    | "id"
    | "productId"
    | "productDisplayName"
    | "discountedPrice"
    | "price"
    | "styleImages"
    | "slug"
    | "displayCategories"
  > {}

export interface BagItemAdapted extends BagItem {
  product: ProductAdapted;
}

export interface BagAdapted extends Bag {
  items: BagItemAdapted[];
  summary: Summary;
}

export interface WishlistItemAdapted extends WishlistItem {
  product: ProductAdapted;
}

export interface WishlistAdapted extends Wishlist {
  items: WishlistItemAdapted[];
}

export interface FilterOptions {
  brands: string[];
  sizes: string[];
  colors: string[];
}
