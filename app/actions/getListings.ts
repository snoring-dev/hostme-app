import prisma from "@/app/utils/prismadb";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings({
  userId,
  bathroomCount,
  category,
  endDate,
  guestCount,
  locationValue,
  roomCount,
  startDate,
}: IListingParams) {
  try {
    let query: any = {};

    if (category) query.category = category;

    if (roomCount) {
      query.roomCount = {
        gte: Number(roomCount),
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: Number(guestCount),
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: Number(bathroomCount),
      };
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: { lte: startDate },
                endDate: { gte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    if (locationValue) query.locationValue = locationValue;

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings.map((l) => ({
      ...l,
      createdAt: l.createdAt.toISOString(),
    }));
  } catch (e: any) {
    throw new Error(e);
  }
}
