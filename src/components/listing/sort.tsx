import React from "react";
import { useRouter } from "next/router";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export const Sort: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const sort = query.sort || "recommended";

  const handleOnChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: value },
    });
  };

  return (
    <div className="mb-8">
      <h3 className="uppercase text-sm">Sort by</h3>
      <RadioGroup
        className="mt-4"
        value={sort as string}
        onValueChange={handleOnChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="recommended" id="recommended" />
          <Label htmlFor="recommended">Recommended</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low-to-high" id="low-to-high" />
          <Label htmlFor="low-to-high"> Price (Low to high)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high-to-low" id="high-to-low" />
          <Label htmlFor="high-to-low">Price (High to low)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
