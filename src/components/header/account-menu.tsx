import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { useSession } from "next-auth/react";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { User } from "lucide-react";
import { pageRoutes } from "@/utils/routes";

export const AccountButton: React.FC = () => {
  const { status } = useSession();
  const { isAuthenticated } = getSessionStatus(status);

  return (
    <Link
      href={isAuthenticated ? pageRoutes.account.index : pageRoutes.login}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <User className="w-5 h-5" />
    </Link>
  );
};
