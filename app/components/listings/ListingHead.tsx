"use client";

import { AuthContext } from "@/app/context/AuthContext";
import useCountries from "@/app/hooks/useCountries";
import { useContext } from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface Props {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
}

function ListingHead({ title, locationValue, imageSrc, id }: Props) {
  const { currentUser } = useContext(AuthContext);
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          alt={`A picture of: ${title}`}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} />
        </div>
      </div>
    </>
  );
}

export default ListingHead;
