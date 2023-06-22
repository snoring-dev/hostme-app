"use client";

import { AuthContext } from "@/app/context/AuthContext";
import useCountries from "@/app/hooks/useCountries";
import { Category, Listing } from "@/app/types";
import { useContext } from "react";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

interface Props {
  listing: Listing;
  category?: Category;
}

const Map = dynamic(() => import('../Map'), { ssr: false });

function ListingInfo({ listing, category }: Props) {
  const { getByValue } = useCountries();
  const { currentUser } = useContext(AuthContext);
  const { guestCount, roomCount, bathroomCount, locationValue, description } =
    listing;
  const coords = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {currentUser?.name}</div>
          <Avatar src={currentUser?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} Guests</div>
          <div>{roomCount} Rooms</div>
          <div>{bathroomCount} Bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coords} />
    </div>
  );
}

export default ListingInfo;
