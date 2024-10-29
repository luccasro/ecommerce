"use client";
import { HighlightsCarousel } from "@/components/editorial/highlights-carousel";
import { PageContent } from "@/components/shared/page-content";
import { Button } from "@/components/ui/button";
import { pageRoutes } from "@/utils/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen mt-8">
      <title>E-commerce | Not Found</title>
      <PageContent>
        <h1 className="font-bold uppercase italic pb-6 text-xl md:text-2xl lg:text-3xl">
          Page not found
        </h1>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or may have been
          removed.
        </p>
        <Button className="mt-6 mb-12" asChild>
          <Link href={pageRoutes.home}>Go to Homepage</Link>
        </Button>
      </PageContent>
      <HighlightsCarousel />
    </main>
  );
}
