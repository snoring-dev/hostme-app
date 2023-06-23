import prisma from "@/app/utils/prismadb";
import { AppUser } from "../types";

export default async function getFavorites(user: AppUser) {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...user.favoriteIds],
        },
      },
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
