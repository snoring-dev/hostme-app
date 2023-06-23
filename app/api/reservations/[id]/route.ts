import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";

interface IParams {
  id?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const { id } = params;

  if (!id || typeof id !== "string" || !currentUser) {
    return NextResponse.error();
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
