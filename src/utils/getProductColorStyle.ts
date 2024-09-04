import colors from "tailwindcss/colors";

export const getProductColorStyle = (baseColour: string) => {
  const color = baseColour.toLowerCase();

  if (color === "white" || color === "black") {
    if (color === "white") {
      return "bg-white border border-gray-300";
    }
    return `bg-${color}`;
  }

  switch (color) {
    case "peach":
      return "bg-orange-200";
    case "navy blue":
      return "bg-blue-900";
    case "beige":
      return "bg-neutral-100";
    case "grey":
      return "bg-gray-500";
    case "olive":
      return "bg-green-700";
  }

  if (!colors?.[color as keyof typeof colors]) {
    return;
  }

  return `bg-${color}-500`;
};
