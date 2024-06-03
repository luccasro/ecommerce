import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBreadcrumb } from "@/utils/getBreadcrumb";
import { pageRoutes } from "@/utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Breadcrumbs: React.FC = () => {
  const router = useRouter();
  const hasSlug = !!router.query.slug;
  const queryPath = (router.query.slug as string[]) || [];

  const breadcrumbPath = !hasSlug ? (
    <BreadcrumbItem>
      <BreadcrumbPage>Shopping</BreadcrumbPage>
    </BreadcrumbItem>
  ) : (
    <>
      <BreadcrumbItem>
        <Link href={pageRoutes.shopping}>
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
        {hasSlug &&
          queryPath.map((path, index) => {
            const currentBreadcrumb = getBreadcrumb(path);
            if (!currentBreadcrumb) return;
            return (
              <Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {currentBreadcrumb}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
