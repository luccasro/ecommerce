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
} from "@prisma/client";

export interface ProductAdapted extends Product {
  styleImages: StyleImages;
  productDescriptors?: ProductDescriptors;
  masterCategory?: MasterCategory;
  subCategory?: SubCategory;
  sizes?: Size[];
  discountData?: DiscountData;
}

export interface BagItemAdapted extends BagItem {
  product: ProductAdapted;
}

export interface BagAdapted extends Bag {
  items: BagItemAdapted[];
  summary: Summary;
}
