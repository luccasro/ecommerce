import {
  Product as ProductSchema,
  StyleImages as StyleImagesSchema,
  ProductDescriptors as ProductDescriptorsSchema,
  MasterCategory as MasterCategorySchema,
  SubCategory as SubCategorySchema,
  StyleOption as StyleOptionSchema,
  DiscountData as DiscountDataSchema,
} from "@prisma/client";

interface ArticleAttribute {
  Fit: string;
  Pattern: string;
  "Body or Garment Size": string;
  "Sleeve Length": string;
  "Sleeve Styling": string;
  Fabric: string;
  Collar: string;
}

interface CrossLink {
  key: string;
  value: string;
}

interface ImageResolutions {
  "1080X1440Xmini": string;
  "48X64": string;
  "1080X1440": string;
  "150X200": string;
  "360X480": string;
  "180X240": string;
  "360X480Xmini": string;
  "180X240Xmini": string;
  "150X200Xmini": string;
  "48X64Xmini": string;
  "125X161": string;
  "125X161Xmini": string;
}

interface Image {
  imageURL: string;
  resolutions: ImageResolutions;
  imageType: string;
}

interface BrandUserProfile {
  uidx: string;
  bio: string;
  name: string;
  image: string;
  publicProfileId: string;
  imageJsonEntryMap: Record<string, string>;
  tagsMap: string;
}

interface MasterCategory {
  id: number;
  typeName: string;
  active: boolean;
  socialSharingEnabled: boolean;
  isReturnable: boolean;
  isExchangeable: boolean;
  pickupEnabled: boolean;
  isTryAndBuyEnabled: boolean;
}

interface SubCategory {
  id: number;
  typeName: string;
  active: boolean;
  socialSharingEnabled: boolean;
  isReturnable: boolean;
  isExchangeable: boolean;
  pickupEnabled: boolean;
  isTryAndBuyEnabled: boolean;
}

interface ArticleType {
  id: number;
  typeName: string;
  active: boolean;
  socialSharingEnabled: boolean;
  isReturnable: boolean;
  isExchangeable: boolean;
  pickupEnabled: boolean;
  isTryAndBuyEnabled: boolean;
  isMyntsEnabled: boolean;
  serviceabilityDisclaimer: {
    title: string;
    desc: string;
  };
}

interface StyleOption {
  id: number;
  name: string;
  value: string;
  unifiedSize: string;
  unifiedSizeValue: string;
  allSize: string;
  skuId: number;
  skuAvailabilityDetailMap: Record<string, unknown>;
  warehouseIdToItemCountMap: Record<string, unknown>;
  inventoryCount: number;
  available: boolean;
  active: boolean;
}

interface ProductDescriptors {
  description: {
    descriptorType: string;
    value: string;
  };
}

interface ArticleDisplayAttr {
  id: number;
  core: {
    order: string;
    display: string;
    pdtDetail: string;
    pdtDeliveryOptions: string;
    pdtSimilar: string;
    pdtLike: string;
  };
  social: {
    order: string;
    display: string;
    userLikes: string;
    styleNotes: string;
    crossSell: string;
  };
  explore: {
    display: string;
    crosslink: string;
    similar: string;
    order: string;
  };
}

interface OtherFlags {
  dataType: string;
  name: string;
  value: string;
}

interface StyleImages {
  default: Image;
  size_representation: string;
  search: Image;
  back: Image;
  left: Image;
  front: Image;
  right: Image;
}

export interface Product {
  id: number;
  uid?: number;
  price: number;
  discountedPrice: number;
  styleType: string;
  productTypeId: number;
  articleNumber: string;
  visualTag: string;
  productDisplayName: string;
  variantName: string;
  myntraRating: number;
  catalogAddDate: number;
  brandName: string;
  ageGroup: string;
  gender: string;
  baseColour: string;
  colour1: string;
  colour2: string;
  fashionType: string;
  season: string;
  year: string;
  usage: string;
  vat: number;
  displayCategories: string;
  weight: string;
  navigationId: number;
  landingPageUrl: string;
  articleAttributes?: ArticleAttribute;
  crossLinks?: CrossLink[];
  brandUserProfile?: BrandUserProfile;
  codEnabled: boolean;
  styleImages: StyleImages;
  lookGoodAlbum: Record<string, unknown>;
  style360Images: Record<string, unknown>;
  masterCategory: MasterCategory;
  subCategory: SubCategory;
  articleType: ArticleType;
  isEMIEnabled: boolean;
  otherFlags: OtherFlags[];
  articleDisplayAttr: ArticleDisplayAttr;
  productDescriptors: ProductDescriptors;
  styleOptions: StyleOption[];
  discountData: any;
}

export interface ProductAdapted extends ProductSchema {
  styleImages: StyleImagesSchema;
  productDescriptors?: ProductDescriptorsSchema;
  masterCategory?: MasterCategorySchema;
  subCategory?: SubCategorySchema;
  styleOptions?: StyleOptionSchema[];
  discountData?: DiscountDataSchema;
}
