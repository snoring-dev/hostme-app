import { User } from "@prisma/client";
import { IconType } from "react-icons";

export type AppUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type Category = {
  label: string;
  description: string;
  icon: IconType;
};
