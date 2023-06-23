import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { Listing } from "./types";

interface Props {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: Props) {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);
  const isEmpty = listings.length === 0;

  if (isEmpty) {
    return (
      <ClientOnly currentUser={currentUser}>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly currentUser={currentUser}>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: Listing) => {
            return (
              <ListingCard key={listing.id} data={listing} />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
