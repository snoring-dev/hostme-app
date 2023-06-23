import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import getListings, { IListingParams } from "../actions/getListings";

interface Props {
  searchParams: IListingParams;
}

async function PropertiesPage({ searchParams }: Props) {
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

  const properties = await getListings(searchParams);

  if (!properties || properties.length === 0) {
    return (
      <ClientOnly currentUser={user}>
        <EmptyState
          title="Nothing to show!"
          subtitle="You haven't created any property yet."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly currentUser={user}>
      <PropertiesClient listings={properties} />
    </ClientOnly>
  );
}

export default PropertiesPage;
