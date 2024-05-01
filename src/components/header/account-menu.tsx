import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { AccountIcon } from "../icons/account";
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
            <AccountIcon />
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
      <AccountIcon />
    </Link>
  );
};
