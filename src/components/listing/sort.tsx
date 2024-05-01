import React from "react";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Sort: React.FC = () => {
  const router = useRouter();
  const sort = router.query.sort || "recommended";

  const handleOnChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: value },
    });
  };

  return (
    <Select value={sort as string} onValueChange={handleOnChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue>Sort</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="recommended">Recommended</SelectItem>
          <SelectItem value="low-to-high"> Price (Low to high)</SelectItem>
          <SelectItem value="high-to-low"> Price (High to low)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
