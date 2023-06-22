"use client";

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  listingId: string;
}

function HeartButton({ listingId }: Props) {
  const currentUser = useContext(AuthContext);
  const hasFavorited = false;
  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px] z-10"
      />
      <AiFillHeart
        size={28}
        className={`
          absolute -top-[2px] -right-[2px]
          ${hasFavorited ? "fill-rose-500" : "fill-neutral-500/60"}
        `}
      />
    </div>
  );
}

export default HeartButton;
