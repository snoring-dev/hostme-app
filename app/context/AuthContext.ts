'use client'

import { createContext } from "react";
import { AppUser } from "../types";

interface ContextType {
  currentUser: AppUser | null;
}

const AuthContext = createContext<ContextType>({ currentUser: null });

export {
  AuthContext
}