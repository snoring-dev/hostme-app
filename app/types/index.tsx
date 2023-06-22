import {
  User,
  Listing as ListingModel,
  Reservation as ReservationModel,
} from "@prisma/client";
import { IconType } from "react-icons";

export type AppUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type Listing = Omit<ListingModel, "createdAt"> & {
  createdAt: string;
};

export type Reservation = Omit<ReservationModel, "createdAt"> & {
  createdAt: string;
};

export type Category = {
  label: string;
  description: string;
  icon: IconType;
};

export enum HOSTING_STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
