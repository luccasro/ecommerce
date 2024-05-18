-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bagId" TEXT,
    "wishlistId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bag" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summaryId" INTEGER,

    CONSTRAINT "Bag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bagId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "BagItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wishlistId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Summary" (
    "id" SERIAL NOT NULL,
    "subtotal" TEXT,
    "shippingFee" TEXT,
    "total" TEXT,
    "taxes" TEXT,
    "discount" TEXT,
    "bagId" TEXT NOT NULL,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountedPrice" DOUBLE PRECISION NOT NULL,
    "styleType" TEXT NOT NULL,
    "productTypeId" INTEGER NOT NULL,
    "articleNumber" TEXT,
    "visualTag" TEXT,
    "productDisplayName" TEXT NOT NULL,
    "variantName" TEXT NOT NULL,
    "myntraRating" DOUBLE PRECISION,
    "catalogAddDate" INTEGER NOT NULL,
    "brandName" TEXT NOT NULL,
    "ageGroup" TEXT,
    "gender" TEXT NOT NULL,
    "baseColour" TEXT NOT NULL,
    "colour1" TEXT,
    "colour2" TEXT,
    "fashionType" TEXT,
    "season" TEXT,
    "year" TEXT,
    "usage" TEXT,
    "vat" DOUBLE PRECISION,
    "displayCategories" TEXT,
    "weight" TEXT,
    "navigationId" INTEGER,
    "landingPageUrl" TEXT NOT NULL,
    "codEnabled" BOOLEAN,
    "isEMIEnabled" BOOLEAN,
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
CREATE TABLE "Size" (
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
    "productId" INTEGER,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
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
    "discountModifiedDate" BIGINT,
    "discountText" JSONB,
    "discountToolTipText" JSONB,

    CONSTRAINT "DiscountData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_bagId_key" ON "User"("bagId");

-- CreateIndex
CREATE UNIQUE INDEX "User_wishlistId_key" ON "User"("wishlistId");

-- CreateIndex
CREATE UNIQUE INDEX "Bag_userId_key" ON "Bag"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bag_summaryId_key" ON "Bag"("summaryId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Summary_bagId_key" ON "Summary"("bagId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bagId_fkey" FOREIGN KEY ("bagId") REFERENCES "Bag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bag" ADD CONSTRAINT "Bag_summaryId_fkey" FOREIGN KEY ("summaryId") REFERENCES "Summary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagItem" ADD CONSTRAINT "BagItem_bagId_fkey" FOREIGN KEY ("bagId") REFERENCES "Bag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagItem" ADD CONSTRAINT "BagItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Size" ADD CONSTRAINT "Size_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
