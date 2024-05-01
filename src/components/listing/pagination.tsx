import React from "react";
import { useRouter } from "next/router";
import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  pages: number;
};

export const Pagination: React.FC<PaginationProps> = ({ pages, ...rest }) => {
  const router = useRouter();
  const currentPage = router.query.page || 1;

  return (
    <PaginationWrapper {...rest}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={Number(currentPage) === 1}
            href={{
              query: {
                ...router.query,
                page: (Number(currentPage) - 1).toString(),
              },
            }}
          />
        </PaginationItem>
        {Array.from({ length: pages }, (_, index) => {
          const currentIndex = index + 1;
          const isActive = currentIndex === Number(currentPage);
          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={isActive}
                inactive={isActive}
                href={{
                  query: { ...router.query, page: currentIndex.toString() },
                }}
              >
                {currentIndex}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            disabled={Number(currentPage) === pages}
            href={{
              query: {
                ...router.query,
                page: (Number(currentPage) + 1).toString(),
              },
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
};
