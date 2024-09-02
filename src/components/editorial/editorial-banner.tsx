import { usePathname } from "next/navigation";
import { Banner } from "../shared/banner";
import { pageRoutes } from "@/utils/routes";

const BLOCKED_ROUTES = [pageRoutes.account.index, pageRoutes.login];

export const EditorialBanner = () => {
  const pathname = usePathname();

  const isBlockedRoute = BLOCKED_ROUTES.some((route) =>
    pathname?.startsWith(route)
  );

  if (isBlockedRoute) {
    return;
  }

  const getCurrentSeason = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    let season = "";

    if (
      (month === 11 && day >= 21) ||
      month === 0 ||
      month === 1 ||
      (month === 2 && day < 20)
    ) {
      season = "winter";
    } else if (
      (month === 2 && day >= 20) ||
      month === 3 ||
      month === 4 ||
      (month === 5 && day < 21)
    ) {
      season = "spring";
    } else if (
      (month === 5 && day >= 21) ||
      month === 6 ||
      month === 7 ||
      (month === 8 && day < 22)
    ) {
      season = "summer";
    } else if (
      (month === 8 && day >= 22) ||
      month === 9 ||
      month === 10 ||
      (month === 11 && day < 21)
    ) {
      season = "fall";
    }

    return season;
  };

  const currentSeason = getCurrentSeason();

  return (
    <Banner
      text={`Come and discover the perfect formula for the best ${currentSeason} looks.`}
      buttonText="BUY NOW"
      href={`${pageRoutes.shopping}/?season=${currentSeason}`}
    />
  );
};
