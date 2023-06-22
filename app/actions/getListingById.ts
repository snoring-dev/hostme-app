import prisma from "@/app/utils/prismadb";

export default async function getListingById(listingId: string) {
  console.log("LISTING_ID:", listingId);
  if (!listingId) return null;

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
        reservations: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString(),
      },
      reservations: [
        ...listing.reservations.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
          startDate: r.startDate.toISOString(),
          endDate: r.endDate.toISOString(),
        })),
      ],
    };
  } catch (e: any) {
    throw new Error(e);
  }
}
