import { Button } from "../ui/button";
import Link from "next/link";

interface BannerProps {
  text: string;
  buttonText?: string;
  href?: string;
}

export const Banner = ({ text, buttonText, href, ...rest }: BannerProps) => {
  return (
    <div
      className="p-4 bg-primary flex justify-center items-center text-white text-sm"
      {...rest}
    >
      <p className="">
        {text}{" "}
        {buttonText && href && (
          <Button asChild variant="link" className="pl-0 text-white underline">
            <Link href={href}>{buttonText}</Link>
          </Button>
        )}
      </p>
    </div>
  );
};
