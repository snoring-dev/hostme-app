import prisma from "@/app/utils/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
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
