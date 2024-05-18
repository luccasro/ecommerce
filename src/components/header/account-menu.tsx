import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { getSessionStatus } from "@/utils/getSessionStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";

export const AccountMenu: React.FC = () => {
  const { data: session, status } = useSession();
  const { isLoading, isAuthenticated } = getSessionStatus(status);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href="/login"
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <User className="w-[16px] h-[16px]" />
    </Link>
  );
};
