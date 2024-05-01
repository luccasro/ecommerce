import React from "react";

export const HamburguerMenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g>
        <path
          d="M3 6.00092H21M3 12.0009H21M3 18.0009H21"
          className="stroke-black dark:stroke-white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath>
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.000915527)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
