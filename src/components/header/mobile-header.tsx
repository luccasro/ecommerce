import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ChevronRightIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { headerLinks } from "@/utils/headerLinks";
import { cn } from "@/utils/cn";

export const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Drawer open={isOpen} direction="left">
      <DrawerTrigger onClick={handleOpen}>
        <Button
          variant="ghost"
          className="inline-flex items-center lg:hidden hover:bg-transparent p-0"
        >
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none h-full">
        <DrawerHeader className="border-b border-grey-600">
          <div>Ecommerce</div>
          <Button
            className="absolute top-0 right-0 mt-7 mr-3 p-0 h-0 hover:bg-transparent"
            variant="ghost"
            onClick={handleOpen}
          >
            <X />
          </Button>
        </DrawerHeader>

        <div className="flex flex-col">
          {headerLinks.map((link) => (
            <div
              className={cn(
                "flex items-center py-4 pl-3 border-b border-grey-500 w-full",
                link.key === "sale" && "text-red-600"
              )}
              key={link.name}
            >
              <Link
                onClick={() => setIsOpen(false)}
                className="w-full"
                href={link.href}
              >
                {link.name}
              </Link>
              <ChevronRightIcon className="w-8 h-8 pr-3" />
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
