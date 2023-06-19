"use client";
import React, { useEffect, useState } from "react";
import { AppUser } from "../types";
import { AuthContext } from "../context/AuthContext";

interface Props {
  currentUser: AppUser | null;
  children: React.ReactNode;
}

function ClientOnly({ currentUser, children }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default ClientOnly;
