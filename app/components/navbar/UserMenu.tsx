"use client";

import { useCallback, useContext, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { useOnClickOutside } from "usehooks-ts";
import { AuthContext } from "@/app/context/AuthContext";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

function UserMenu() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpening = useCallback(() => setIsOpen((value) => !value), []);
  const { currentUser } = useContext(AuthContext);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(userMenuRef, () => setIsOpen(false));

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpening}
          className="
                    p-4
                    md:px-2
                    md:py-1
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image ?? ""} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={userMenuRef}
          className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
            "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => router.push(`/properties/?userId=${currentUser.id}`)}
                  label="My properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="Host my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Create account"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
