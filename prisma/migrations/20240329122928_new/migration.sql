-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountedPrice" DOUBLE PRECISION NOT NULL,
    "styleType" TEXT NOT NULL,
    "productTypeId" INTEGER NOT NULL,
    "articleNumber" TEXT NOT NULL,
    "visualTag" TEXT,
    "productDisplayName" TEXT NOT NULL,
    "variantName" TEXT NOT NULL,
    "myntraRating" DOUBLE PRECISION NOT NULL,
    "catalogAddDate" INTEGER NOT NULL,
    "brandName" TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "baseColour" TEXT NOT NULL,
    "colour1" TEXT,
    "colour2" TEXT,
    "fashionType" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL,
    "displayCategories" TEXT,
    "weight" TEXT NOT NULL,
    "navigationId" INTEGER NOT NULL,
    "landingPageUrl" TEXT NOT NULL,
    "codEnabled" BOOLEAN NOT NULL,
    "isEMIEnabled" BOOLEAN NOT NULL,
    "masterCategoryId" INTEGER,
    "subCategoryId" INTEGER,
    "productDescriptorsId" INTEGER,
    "styleImagesId" INTEGER NOT NULL,
    "discountDataId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterCategory" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "typeName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "socialSharingEnabled" BOOLEAN NOT NULL,
    "isReturnable" BOOLEAN NOT NULL,
    "isExchangeable" BOOLEAN NOT NULL,
    "pickupEnabled" BOOLEAN NOT NULL,
    "isTryAndBuyEnabled" BOOLEAN NOT NULL,

    CONSTRAINT "MasterCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "typeName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "socialSharingEnabled" BOOLEAN NOT NULL,
    "isReturnable" BOOLEAN NOT NULL,
    "isExchangeable" BOOLEAN NOT NULL,
    "pickupEnabled" BOOLEAN NOT NULL,
    "isTryAndBuyEnabled" BOOLEAN NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDescriptors" (
    "id" SERIAL NOT NULL,
    "descriptorType" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ProductDescriptors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StyleOption" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "unifiedSize" TEXT,
    "unifiedSizeValue" TEXT,
    "unifiedSizeScale" TEXT,
    "allSize" TEXT,
    "skuId" INTEGER,
    "inventoryCount" INTEGER,
    "available" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "skuAvailabilityDetailMap" JSONB,
    "warehouseIdToItemCountMap" JSONB,
    "productId" INTEGER,

    CONSTRAINT "StyleOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StyleImages" (
    "id" SERIAL NOT NULL,
    "default" TEXT NOT NULL,
    "sizeRepresentation" TEXT NOT NULL,
    "search" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "left" TEXT NOT NULL,
    "front" TEXT NOT NULL,
    "right" TEXT NOT NULL,

    CONSTRAINT "StyleImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountData" (
    "id" SERIAL NOT NULL,
    "discountType" INTEGER,
    "discountAmount" INTEGER,
    "discountId" INTEGER,
    "discountRuleId" INTEGER,
    "discountPercent" INTEGER,
    "discountModifiedDate" INTEGER,
    "discountText" JSONB,
    "discountToolTipText" JSONB,

    CONSTRAINT "DiscountData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_masterCategoryId_fkey" FOREIGN KEY ("masterCategoryId") REFERENCES "MasterCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productDescriptorsId_fkey" FOREIGN KEY ("productDescriptorsId") REFERENCES "ProductDescriptors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_styleImagesId_fkey" FOREIGN KEY ("styleImagesId") REFERENCES "StyleImages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_discountDataId_fkey" FOREIGN KEY ("discountDataId") REFERENCES "DiscountData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StyleOption" ADD CONSTRAINT "StyleOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
