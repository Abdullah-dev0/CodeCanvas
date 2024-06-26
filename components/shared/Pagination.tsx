"use client";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface PaginationProps {
  page: number | undefined;
  totalPages: number | undefined;
}

//want to make this component reusable for home page and project page

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex justify-between mt-6">
      <Button onClick={() => onClick("prev")} disabled={Number(page) <= 1}>
        Previous
      </Button>
      <Button
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages!}
        className={`
        ${Number(page) >= totalPages! ? "cursor-not-allowed" : ""}
        `}>
        next
      </Button>
    </div>
  );
};

export default Pagination;
