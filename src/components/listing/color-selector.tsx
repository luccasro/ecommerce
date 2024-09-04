import { useRouter } from "next/router";
import { Toggle } from "../ui/toggle";
import { getProductColorStyle } from "@/utils/getProductColorStyle";
import { cn } from "@/utils/cn";

interface ColorSelectorProps {
  colors?: string[];
}
export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors = [],
}) => {
  const router = useRouter();
  const { query } = router;
  const currentColors =
    (Array.isArray(query?.colors)
      ? query?.colors.map((color: string) => color.toLowerCase())
      : query?.colors?.toLowerCase().split(",")) || [];

  const handleChange = (isChecked: boolean, value: string) => {
    const updatedColors = isChecked
      ? [...currentColors, value]
      : currentColors.filter((color) => color !== value);

    const newQuery =
      updatedColors.length > 0
        ? { ...router.query, colors: updatedColors.join(",") }
        : { ...router.query };

    if (updatedColors.length === 0) {
      delete newQuery.colors;
    }

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <div className="mb-8">
      <h3 className="pb-4 uppercase text-sm">Colors</h3>
      <div className="grid grid-cols-4 gap-2">
        {colors?.map((color) => {
          const currentColor = color.toLowerCase();
          const colorStyle = getProductColorStyle(color);
          const isChecked = currentColors.includes(currentColor);
          return (
            <Toggle
              key={color}
              value={color}
              variant="default"
              onPressedChange={(isChecked) =>
                handleChange(isChecked, currentColor)
              }
              pressed={isChecked}
            >
              <div className={cn("w-6 h-6 rounded-full", colorStyle)}></div>
              {/* <div className="min-w-3 flex ml-2">{color}</div> */}
            </Toggle>
          );
        })}
      </div>
    </div>
  );
};
