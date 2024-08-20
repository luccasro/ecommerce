import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { User } from "lucide-react";
import { pageRoutes } from "@/utils/routes";

export const AccountMenu: React.FC = () => {
  const { status } = useSession();
  const { isLoading, isAuthenticated } = getSessionStatus(status);

  // if (isLoading) {
  //   return null;
  // }

  // if (isAuthenticated) {
  //   return (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="ghost" size="icon">
  //           <User className="w-5 h-5" />
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent>
  //         <DropdownMenuItem>
  //           <Link href={pageRoutes.account.index}>Account</Link>
  //         </DropdownMenuItem>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem>Support</DropdownMenuItem>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   );
  // }

  return (
    <Link
      href={isAuthenticated ? pageRoutes.account.index : pageRoutes.login}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <User className="w-5 h-5" />
    </Link>
  );
};
