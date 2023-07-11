import { NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import isNil from "lodash/isNil";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  const body = await req.json();

  if (!currentUser) {
    return NextResponse.error();
  }

  const {
    title,
    description,
    imageSrc,
    otherPictures,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const allValuesSet = Object.values(body).every((entry) => !isNil(entry));

  if (!allValuesSet) {
    return NextResponse.error();
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      otherPictures,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
