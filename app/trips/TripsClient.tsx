"use client";

import { useCallback, useContext, useState } from "react";
import { AppUser, Listing, Resa, Reservation } from "../types";
import { AuthContext } from "../context/AuthContext";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface Props {
  reservations: Resa[];
}

function TripsClient({ reservations }: Props) {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        const resp = await axios.delete(`/api/reservations/${id}`);
        if (resp) {
          toast.success("Your trip has been canceled!");
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
        title="Trips"
        subtitle="Where you've been and where you're going!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((resa) => (
          <ListingCard
            key={resa.id}
            data={resa.listing}
            reservation={resa}
            actionId={resa.id}
            onAction={onCancel}
            disabled={deletingId === resa.id}
            actionLabel="Cancel this trip"
          />
        ))}
      </div>
    </Container>
  );
}

export default TripsClient;
