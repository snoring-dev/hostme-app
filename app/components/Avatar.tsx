"use client";

import Image from "next/image";

interface Props {
  src: string | undefined | null;
}

function Avatar({ src }: Props) {
  const imageUrl = src ? src : 'https://res.cloudinary.com/mjemmoudi/image/upload/v1686768538/avatar-g01c9b1e39_1280_qtppuw.png';
  return (
    <Image
      height={30}
      width={30}
      className="rounded-full"
      alt="user avatar"
      src={imageUrl}
    />
  );
}

export default Avatar;
