import { pageRoutes } from "@/utils/routes";
import { BannerImage } from "./banner-image";

export const EditorialDoubleBannerImage = () => {
  return (
    <div className="grid grid-cols-2 w-full gap-2">
      <BannerImage
        title="SHOP WOMEN"
        alt="SHOP WOMEN"
        src="/images/women-shopping.jpg"
        href={`${pageRoutes.shopping}/women`}
      />
      <BannerImage
        title="SHOP MEN"
        alt="SHOP MEN"
        src="/images/men-shopping.jpg"
        href={`${pageRoutes.shopping}/men`}
      />
    </div>
  );
};
