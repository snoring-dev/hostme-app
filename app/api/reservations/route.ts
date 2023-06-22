import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/utils/prismadb";
import isNil from "lodash/isNil";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  const allValuesSet = Object.values(body).every((v) => !isNil(v));

  if (!allValuesSet || !currentUser) {
    return NextResponse.error();
  }

  const listingAndResa = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndResa);
}
