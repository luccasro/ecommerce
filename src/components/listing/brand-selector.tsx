import { useRouter } from "next/router";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Toggle } from "../ui/toggle";

interface BrandSelectorProps {
  brands?: string[];
}
export const BrandSelector: React.FC<BrandSelectorProps> = ({ brands }) => {
  const router = useRouter();
  const { query } = router;
  const currentBrands =
    (Array.isArray(query?.brands)
      ? query?.brands.map((brand: string) => brand.toLowerCase())
      : query?.brands?.toLowerCase().split(",")) || [];

  const handleChange = (isChecked: CheckedState, value: string) => {
    const updatedBrands = isChecked
      ? [...currentBrands, value]
      : currentBrands.filter((brand) => brand !== value);

    const newQuery =
      updatedBrands.length > 0
        ? { ...router.query, brands: updatedBrands.join(",") }
        : { ...router.query };

    if (updatedBrands.length === 0) {
      delete newQuery.brands;
    }

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <div className="mb-8">
      <h3 className="pb-4 uppercase text-sm">Brands</h3>
      <div className="grid grid-cols-2 gap-2">
        {brands?.map((brand) => {
          const currentBrand = brand.toLowerCase();
          const isChecked = currentBrands.includes(currentBrand);
          return (
            <Toggle
              key={brand}
              value={brand}
              variant="outline"
              onPressedChange={(isChecked) =>
                handleChange(isChecked, currentBrand)
              }
              pressed={isChecked}
            >
              <div className="min-w-3"> {brand}</div>
            </Toggle>
          );
        })}
      </div>
    </div>
  );
};
