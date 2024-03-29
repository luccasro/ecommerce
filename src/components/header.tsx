import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { headerLinks } from "@/utils/headerLinks";
import { MiniBag } from "./minibag";
import { Search } from "./search";

export const Header = () => {
  return (
    <header className="mx-auto px-4 md:px-6 lg:px-8 sticky top-0 z-40 shadow-md bg-white dark:bg-gray-900">
      <div className="container flex h-16 w-full shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6 hidden lg:flex" href="/">
          <CarIcon className="h-6 w-6" />
          <span className="sr-only">E-commerce</span>
        </Link>
        <div className="flex gap-2">
          {headerLinks.map((link) => (
            <Link className="pr-4" key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <Search />
          <Button
            className="justify-self-end px-2 py-1 text-xs"
            variant="outline"
          >
            Sign in
          </Button>
          <Button className="justify-self-end px-2 py-1 text-xs">
            Sign Up
          </Button>

          <MiniBag />
          <ThemeToggle />
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
