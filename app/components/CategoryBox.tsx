"use client";

import React, { useCallback } from "react";
import { Category } from "../types";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface Props {
  category: Category;
  selected?: boolean;
}

function CategoryBox({ category, selected = false }: Props) {
  const { label, icon: Icon } = category;
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) currentQuery = queryString.parse(params.toString());
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${selected ? "border-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    >
      {Icon && <Icon size={26} />}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}

export default CategoryBox;
