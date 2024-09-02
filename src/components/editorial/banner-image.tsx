import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

interface BannerImageProps {
  src: string;
  alt: string;
  title?: string;
  href?: string;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
}

export const BannerImage: React.FC<BannerImageProps> = ({
  src,
  alt,
  title,
  href,
  className,
  imageClassName,
  titleClassName,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : { href: "" };

  return (
    <Wrapper className={cn("relative w-full", className)} {...wrapperProps}>
      <Image
        alt={alt}
        src={src}
        className={cn("w-full object-cover object-top h-full", imageClassName)}
        width={0}
        height={0}
        sizes="100vw"
        onLoadingComplete={() => setIsImageLoaded(true)}
      />
      {title && isImageLoaded && (
        <div
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center text-white text-sm sm:text-xl md:text-3xl font-bold",
            titleClassName
          )}
        >
          {title}
        </div>
      )}
    </Wrapper>
  );
};
