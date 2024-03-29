import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(router.query.search || "");

  const searchIcon = (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: "/shopping",
      query: { search: searchQuery },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{searchIcon}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-96">
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="relative w-full">
              <Input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20"
                placeholder="Search...  "
                required
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none"
              >
                {searchIcon}
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
