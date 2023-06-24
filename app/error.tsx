"use client";

import { useEffect } from "react";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";

interface Props {
  error: Error;
}

function ErrorState({ error }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ClientOnly currentUser={null}>
      <EmptyState
        title="We're Sorry..."
        subtitle="Semothing went wrong. Please try later!"
      />
    </ClientOnly>
  );
}

export default ErrorState;
