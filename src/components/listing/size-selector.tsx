import { useRouter } from "next/router";
import { Toggle } from "../ui/toggle";

interface SizeSelectorProps {
  sizes?: string[];
}
export const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes = [] }) => {
  const router = useRouter();
  const { query } = router;
  const currentSizes =
    (Array.isArray(query?.sizes)
      ? query?.sizes.map((size: string) => size.toLowerCase())
      : query?.sizes?.toLowerCase().split(",")) || [];

  const handleChange = (isChecked: boolean, value: string) => {
    const updatedSizes = isChecked
      ? [...currentSizes, value]
      : currentSizes.filter((size) => size !== value);

    const newQuery =
      updatedSizes.length > 0
        ? { ...router.query, sizes: updatedSizes.join(",") }
        : { ...router.query };

    if (updatedSizes.length === 0) {
      delete newQuery.sizes;
    }

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <div className="mb-8">
      <h3 className="pb-4 uppercase text-sm">Sizes</h3>
      <div className="grid grid-cols-4 gap-2">
        {sizes?.map((size) => {
          const currentSize = size.toLowerCase();
          const isChecked = currentSizes.includes(currentSize);
          return (
            <Toggle
              key={size}
              value={size}
              variant="outline"
              onPressedChange={(isChecked) =>
                handleChange(isChecked, currentSize)
              }
              pressed={isChecked}
            >
              <div className="min-w-3"> {size}</div>
            </Toggle>
          );
        })}
      </div>
    </div>
  );
};
