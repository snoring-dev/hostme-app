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

export type Reservation = Omit<
  ReservationModel,
  "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type Category = {
  label: string;
  description: string;
  icon: IconType;
};

export type Resa = Reservation & {
  listing: Listing;
  user: AppUser;
};

export type SafeListing = Listing & {
  user: AppUser;
  reservations: Reservation[];
};

export enum HOSTING_STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export enum SEARCH_STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
