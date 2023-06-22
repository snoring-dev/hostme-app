import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';

interface Props {
  params: {
    listingId: string;
  }
}

async function ListingPage({ params }: Props) {
  const listing = await getListingById(params.listingId);
  const user = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly currentUser={user}>
        <EmptyState subtitle="Unfortunately, that listing is no longer available!" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly currentUser={user}>
      <ListingClient listing={listing} />
    </ClientOnly>
  )
}

export default ListingPage