import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "./FavoritesClient";
import getFavorites from "../actions/getFavorites";

async function FavoritesPage() {
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

  const favorites = await getFavorites(user);

  if (!favorites || favorites.length === 0) {
    return (
      <ClientOnly currentUser={user}>
        <EmptyState
          title="Nothing to show!"
          subtitle="Looks like you have no listings in your favorites."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly currentUser={user}>
      <FavoritesClient listings={favorites} />
    </ClientOnly>
  );
}

export default FavoritesPage;
