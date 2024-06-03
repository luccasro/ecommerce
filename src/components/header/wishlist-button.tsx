import { useWishlist } from "@/contexts/wishlist-context";
import { buttonVariants } from "../ui/button";
import { pageRoutes } from "@/utils/routes";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";

export const WishlistButton: React.FC = () => {
  const { totalItems } = useWishlist();
  const router = useRouter();

  const isActive = router.pathname === pageRoutes.wishlist;

  return (
    <Link
      href={pageRoutes.wishlist}
      className={buttonVariants({
        variant: "ghost",
        size: "icon",
        className: "relative",
      })}
    >
      <Heart className={cn("w-5 h-5", isActive && "fill-foreground")} />
      {!!totalItems && (
        <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white font-mono text-[10px] leading-normal text-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
};
