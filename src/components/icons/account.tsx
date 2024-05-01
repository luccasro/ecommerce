export const AccountIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 30 28"
      className="w-5 h-4 fill-black stroke-black dark:stroke-white dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="0.3"
      fill="white"
      {...props}
    >
      <g>
        <path d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z" />
      </g>
    </svg>
  );
  return (
    <svg
      className="w-4 h-4 stroke-black fill-black dark:stroke-white dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 24"
      strokeWidth="1"
      {...props}
    >
      <path d="m16,17.01c4.41,0,8-3.59,8-8S20.41,1,16,1s-8,3.59-8,8,3.59,8,8,8Zm0-14.01c3.31,0,6,2.69,6,6s-2.69,6-6,6-6-2.69-6-6,2.69-6,6-6Z" />
      <path d="m20.01,18.99h-8.02c-6.06,0-10.99,4.93-10.99,10.99v1.01h30v-1.01c0-6.06-4.93-10.99-10.99-10.99ZM3.05,29c.49-4.5,4.31-8,8.94-8h8.02c4.62,0,8.44,3.5,8.93,8H3.05Z" />
    </svg>
  );
};
