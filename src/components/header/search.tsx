"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;

    if (!searchParams || !searchQuery.length) return;

    const params = new URLSearchParams(searchParams);
    params.set("search", searchQuery);
    replace(`/shopping?${params.toString()}`);
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="flex">
        <div className="relative w-full">
          <Input
            type="search"
            name="search"
            defaultValue={searchParams?.get("search") || ""}
            className="block p-2.5 w-full z-20"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none"
          >
            <SearchIcon className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export const Search = () => {
  return (
    <Suspense fallback={null}>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost">
            <SearchIcon className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-96">
          <SearchForm />
        </PopoverContent>
      </Popover>
    </Suspense>
  );
};
