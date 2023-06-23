import React from "react";
import Container from "../components/Container";
import { Listing } from "../types";
import ListingCard from "../components/listings/ListingCard";
import Heading from "../components/Heading";

interface Props {
  listings: Listing[];
}

function FavoritesClient({ listings }: Props) {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="All your favorite places!"
      />
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: Listing) => {
          return <ListingCard key={listing.id} data={listing} />;
        })}
      </div>
    </Container>
  );
}

export default FavoritesClient;
