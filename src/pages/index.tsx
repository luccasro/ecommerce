import { EditorialBannerImage } from "@/components/editorial/editorial-banner-image";
import { HighlightsCarousel } from "@/components/editorial/highlights-carousel";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <EditorialBannerImage />
      <div className="my-12">
        <HighlightsCarousel />
      </div>
    </div>
  );
}
