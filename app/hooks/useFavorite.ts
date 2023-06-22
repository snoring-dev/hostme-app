import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useContext, useMemo } from "react";
import { toast } from "react-hot-toast";
import { AppUser } from "../types";
import useLoginModal from "./useLoginModal";
import { AuthContext } from "../context/AuthContext";

const useFavorite = (listingId: string) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds ?? [];
    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const request = hasFavorited
          ? () => axios.delete(`/api/favorites/${listingId}`)
          : () => axios.post(`/api/favorites/${listingId}`);
        await request();
        router.refresh();
        toast.success("New item added to you favorites");
      } catch (e: any) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
