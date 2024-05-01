import React from "react";

export const WishlistIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 60 60"
      strokeWidth="5"
      stroke="currentColor"
      fill="none"
      {...props}
    >
      <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z" />
    </svg>
  );
};
