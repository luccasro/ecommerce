import {
  Product,
  StyleImages,
  ProductDescriptors,
  MasterCategory,
  SubCategory,
  StyleOption,
  DiscountData,
} from "@prisma/client";

export interface ProductAdapted extends Product {
  styleImages: StyleImages;
  productDescriptors?: ProductDescriptors;
  masterCategory?: MasterCategory;
  subCategory?: SubCategory;
  styleOptions?: StyleOption[];
  discountData?: DiscountData;
}
