import { cn } from "@/utils/cn";

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContent: React.FC<PageContentProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn("w-auto mx-6 xl:max-w-[76rem] xl:mx-auto", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
