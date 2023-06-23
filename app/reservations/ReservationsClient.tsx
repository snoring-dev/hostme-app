"use client";

import { useRouter } from "next/navigation";
import { Resa } from "../types";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface Props {
  reservations: Resa[];
}

function ReservationsClient({ reservations }: Props) {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        const resp = await axios.delete(`/api/reservations/${id}`);
        if (resp) {
          toast.success("Reservation canceled!");
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((resa) => (
          <ListingCard
            key={resa.id}
            data={resa.listing}
            reservation={resa}
            actionId={resa.id}
            onAction={onCancel}
            disabled={deletingId === resa.id}
            actionLabel="Cancel this reservation"
          />
        ))}
      </div>
    </Container>
  );
}

export default ReservationsClient;
