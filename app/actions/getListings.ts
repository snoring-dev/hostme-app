import prisma from "@/app/utils/prismadb";

export interface IListingParams {
  userId?: string;
}

export default async function getListings({ userId }: IListingParams) {
  try {
    let query: any = {};

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
