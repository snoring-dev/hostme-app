"use client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { AuthContext } from "@/app/context/AuthContext";
import { AppUser, Listing, Reservation } from "@/app/types";
import { categories } from "@/app/utils/categories";
import React, { useContext, useMemo } from "react";

interface Props {
  listing: Listing & { user: AppUser };
  reservations?: Reservation[];
}

function ListingClient({ listing, reservations = [] }: Props) {
  const { currentUser } = useContext(AuthContext);
  const category = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-7 mt-6">
            <ListingInfo category={category} listing={listing} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
