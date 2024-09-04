import { EditorialDoubleBannerImage } from "@/components/editorial/editorial-double-banner-image";
import { HighlightsCarousel } from "@/components/editorial/highlights-carousel";

export default function Home() {
  return (
    <div>
      <EditorialDoubleBannerImage />
      <div className="my-12">
        <HighlightsCarousel />
      </div>
    </div>
  );
}
