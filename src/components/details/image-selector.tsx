import Image from "next/image";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import { useState } from "react";

interface ImagesSelectorProps {
  sideImages: string[];
  alt: string;
  onSelectImage?: (imageURL: string) => void;
  className?: string;
}

export const ImagesSelector: React.FC<ImagesSelectorProps> = ({
  sideImages,
  alt,
  className,
  onSelectImage,
}) => {
  const [selectedImage, setSelectedImage] = useState(sideImages[0]);

  const handleImageSelect = (imageURL: string) => {
    setSelectedImage(imageURL);
    onSelectImage?.(imageURL);
  };
  return (
    <div className={cn("w-1/6 mr-2 flex sm:flex-col gap-2", className)}>
      {sideImages.map(
        (src, index) =>
          src && (
            <Button
              variant="link"
              className="h-auto p-0"
              onMouseEnter={() => handleImageSelect(src)}
              key={index}
            >
              <Image
                className={cn(
                  "w-full",
                  selectedImage === src &&
                    "border border-2 border-gray-600 rounded-sm"
                )}
                alt={alt}
                src={src}
                width={0}
                height={0}
                sizes="100vw"
              />
            </Button>
          )
      )}
    </div>
  );
};
