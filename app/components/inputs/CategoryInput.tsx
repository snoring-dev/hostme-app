"use client";

import { IconType } from "react-icons";

interface Props {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

function CategoryInput({
  label,
  icon: Icon,
  selected = false,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        items-center
        justify-center
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}

export default CategoryInput;
