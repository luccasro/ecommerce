import { cn } from "@/utils/cn";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/router";
import { debounce } from "lodash";

const min = 0;
const max = 5000;

export const PriceRange = () => {
  const router = useRouter();
  const { query } = router;
  const price = query.price ? (query.price as string).split("-") : [];
  const value =
    price.length > 0 ? [parseInt(price[0]), parseInt(price[1])] : [min, max];

  const debouncedHandleChange = debounce((value: any) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, price: `${value[0]}-${value[1]}` },
    });
  }, 500);

  const handleChange = (value: number[] | number) => {
    if (Array.isArray(value) && value.length > 1) {
      debouncedHandleChange(value);
    }
  };

  return (
    <div className="mb-14">
      <h3 className="pb-4 uppercase text-sm">Price</h3>
      <Slider
        defaultValue={value}
        max={max}
        min={min}
        step={10}
        value={value}
        onValueChange={handleChange}
        formatLabel={(value) => `${value} €`}
      />
    </div>
  );
};
