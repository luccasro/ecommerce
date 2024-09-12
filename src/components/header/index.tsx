import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { headerLinks } from "@/utils/headerLinks";
import { MiniBag } from "../bag/minibag";
import { Search } from "./search";
import { AccountButton } from "./account-menu";
import { WishlistButton } from "./wishlist-button";
import { MobileHeader } from "./mobile-header";
import { cn } from "@/utils/cn";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 shadow-md bg-white dark:bg-gray-900">
      <div className="w-auto mx-6 xl:max-w-[76rem] xl:mx-auto flex h-16 shrink-0 items-center">
        <MobileHeader />
        <Link className="mr-6 hidden lg:flex" href="/">
          <CarIcon className="h-6 w-6" />
          <span className="sr-only">E-commerce</span>
        </Link>
        <div className="flex gap-2 hidden lg:block">
          {headerLinks.map((link) => (
            <Link
              className={cn(
                "pr-4 font-semibold text-sm uppercase",
                link.key === "sale" && "text-red-500"
              )}
              key={link.name}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <Search />
          <AccountButton />
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
