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

interface BreadcrumbsProps {
  withTitle?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ withTitle }) => {
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
    <>
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
      {withTitle && hasSlug && (
        <h1 className="font-bold uppercase italic pt-6 text-xl md:text-3xl">
          {queryPath[queryPath.length - 1]}
        </h1>
      )}
    </>
  );
};

export default Breadcrumbs;
