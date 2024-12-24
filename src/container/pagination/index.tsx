import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getItemProps = (page: number) =>
    ({
      variant: currentPage === page ? "filled" : "text",
      color: currentPage === page ? "blue" : "gray",
      onClick: () => onPageChange(page),
    }) as any;

  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5; // max visible page
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(startPage + maxVisible - 1, totalPages);

    // Adjust startPage if endPage exceeds totalPages
    startPage = Math.max(1, endPage - maxVisible + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex mx-auto my-2 justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        Previous
      </Button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
