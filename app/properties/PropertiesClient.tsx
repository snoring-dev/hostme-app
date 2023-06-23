"use client"

import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import { Listing } from "../types";
import ListingCard from "../components/listings/ListingCard";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Props {
  listings: Listing[];
}

function PropertiesClient({ listings }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        const resp = await axios.delete(`/api/listings/${id}`);
        if (resp) {
          toast.success("Your property has been removed!");
          router.refresh();
        }
      } catch (e: any) {
        toast.error("Oups! Something went wrong.");
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="All places you have added to our community!"
      />
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: Listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Remove this property"
            />
          );
        })}
      </div>
    </Container>
  );
}

export default PropertiesClient;
