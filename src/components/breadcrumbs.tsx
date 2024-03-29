import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getHeaderLink } from "@/utils/headerLinks";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Breadcrumbs: React.FC = () => {
  const router = useRouter();
  const currentQuery = getHeaderLink(router.query.gender as string);

  const breadcrumbPath = !currentQuery ? (
    <BreadcrumbItem>
      <BreadcrumbPage>Shopping</BreadcrumbPage>
    </BreadcrumbItem>
  ) : (
    <>
      <BreadcrumbItem>
        <Link href="/shopping">
          <BreadcrumbLink>Shopping</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
    </>
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">
            <BreadcrumbLink>Home</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbPath}
        {currentQuery && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentQuery?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
