import { usePathname, useSearchParams } from "next/navigation";
import { Banner } from "../shared/banner";
import { pageRoutes } from "@/utils/routes";
import { getCurrentSeason } from "@/utils/getCurrentSeason";

const BLOCKED_ROUTES = [pageRoutes.account.index, pageRoutes.login];

export const EditorialBanner = () => {
  const pathname = usePathname();
  const query = useSearchParams();
  const currentSeason = getCurrentSeason();

  const isCurrentSeason =
    pathname === pageRoutes.shopping && query?.get("season") === currentSeason;
  const bannerLink = `${pageRoutes.shopping}/?season=${currentSeason}`;

  const isBlockedRoute =
    BLOCKED_ROUTES.some((route) => pathname?.startsWith(route)) ||
    isCurrentSeason;

  if (isBlockedRoute) {
    return;
  }

  return (
    <Banner
      text={`Come and discover the perfect formula for the best ${currentSeason} looks.`}
      buttonText="BUY NOW"
      href={bannerLink}
    />
  );
};
