import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
import { Resa } from "../types";

async function TripsPage() {
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

  const reservations = await getReservations({ userId: user.id });

  if (!reservations || reservations.length === 0) {
    return (
      <ClientOnly currentUser={user}>
        <EmptyState
          title="No trips!"
          subtitle="Looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly currentUser={user}>
      <TripsClient reservations={reservations as Resa[]} />
    </ClientOnly>
  );
}

export default TripsPage;
