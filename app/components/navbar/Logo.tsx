'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

function Logo() {
  return (
    <Image
        alt="Hosme logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="https://res.cloudinary.com/mjemmoudi/image/upload/v1686766162/Airbnb_Logo_Be%CC%81lo_dvfvem.svg"
    />
  );
}

export default Logo;
