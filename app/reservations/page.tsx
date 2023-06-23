import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "../actions/getReservations";
import { Resa } from "../types";
import ReservationsClient from "./ReservationsClient";

async function ReservationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <ClientOnly currentUser={user}>
        <EmptyState
          title="Unauthorized!"
          subtitle="Please login to see this page."
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: user.id });

  if (!reservations || reservations.length === 0) {
    return (
      <ClientOnly currentUser={user}>
        <EmptyState
          title="No reservations!"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly currentUser={user}>
      <ReservationsClient reservations={reservations as Resa[]} />
    </ClientOnly>
  );
}

export default ReservationsPage;
