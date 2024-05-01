import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { headerLinks } from "@/utils/headerLinks";
import { MiniBag } from "../bag/minibag";
import { Search } from "./search";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { WishlistIcon } from "../icons/wishlist";
import { HamburguerMenuIcon } from "../icons/hamburguer-menu";
import { CloseIcon } from "../icons/close";
import { AccountMenu } from "./account-menu";

const WishlistButton: React.FC = () => (
  <Link
    href="/wishlist"
    className={buttonVariants({ variant: "ghost", size: "icon" })}
  >
    <WishlistIcon />
  </Link>
);

export const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="">
      <Drawer open={isOpen} direction="left">
        <DrawerTrigger onClick={handleOpen}>
          <Button
            variant="ghost"
            className="inline-flex items-center lg:hidden hover:bg-transparent p-0"
          >
            <HamburguerMenuIcon />
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
              <CloseIcon />
            </Button>
          </DrawerHeader>

          <div className="flex flex-col">
            {headerLinks.map((link) => (
              <div
                className="flex items-center py-4 pl-3 border-b border-grey-600 w-full"
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
    </div>
  );
};

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 shadow-md bg-white dark:bg-gray-900">
      <div className="w-auto mx-4 xl:max-w-[76rem] xl:mx-auto flex h-16 shrink-0 items-center">
        <MobileHeader />
        <Link className="mr-6 hidden lg:flex" href="/">
          <CarIcon className="h-6 w-6" />
          <span className="sr-only">E-commerce</span>
        </Link>
        <div className="flex gap-2 hidden lg:block">
          {headerLinks.map((link) => (
            <Link className="pr-4 font-medium" key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <Search />
          <AccountMenu />
          <WishlistButton />
          <MiniBag />
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

function CarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
