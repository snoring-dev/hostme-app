import prisma from "@/app/utils/prismadb";

interface Params {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations({
  listingId,
  userId,
  authorId,
}: Params) {
  try {
    const query: any = {};
    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      listing: {
        ...r.listing,
        createdAt: r.listing.createdAt.toISOString(),
      },
    }));
  } catch (e: any) {
    throw new Error(e);
  }
}
