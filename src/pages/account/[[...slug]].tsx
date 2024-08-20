import { AccountSkeleton } from "@/components/account/account-skeleton";
import { Appearance } from "@/components/account/appearance";
import { ChangePassword } from "@/components/account/change-password";
import { ProfileForm } from "@/components/account/profile-form";
import { SidebarNav } from "@/components/account/sidebar-nav";
import { Separator } from "@/components/ui/separator";
import { getSessionStatus } from "@/utils/getSessionStatus";
import { pageRoutes } from "@/utils/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const sidebarNavItems = [
  {
    title: "Profile",
    href: pageRoutes.account.profile,
    slug: "profile",
    component: ProfileForm,
  },
  {
    title: "Change Password",
    href: pageRoutes.account.changePassword,
    slug: "change-password",
    component: ChangePassword,
  },
  {
    title: "Appearance",
    href: pageRoutes.account.appearance,
    slug: "appearance",
    component: Appearance,
  },
];

const AccountPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { isLoading, isAuthenticated } = getSessionStatus(status);

  useEffect(() => {
    const handleRoute = () => {
      if (!isLoading && !isAuthenticated) {
        router.push(pageRoutes.login);
      }

      if (!router.query.slug) {
        router.push(pageRoutes.account.profile);
      }

      if (
        router.query.slug &&
        !sidebarNavItems.some((item) => item.slug === router.query.slug?.[0])
      ) {
        router.push(pageRoutes.notFound);
      }
    };

    router.isReady && handleRoute();
  }, [isAuthenticated, isLoading, router]);

  const CurrentComponent = useMemo(() => {
    return sidebarNavItems.find((item) => item.slug === router.query.slug?.[0])
      ?.component;
  }, [router.query.slug]);

  if (isLoading && !isAuthenticated) {
    return (
      <div className="p-10">
        <AccountSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6 sm:p-10 sm:pt-6 md:block">
      <div className="space-y-0.5">
        <h1 className="font-bold uppercase italic text-xl md:text-3xl">
          My Account
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and set your preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {CurrentComponent && <CurrentComponent />}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
