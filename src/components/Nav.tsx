import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar justify-between bg-base-100 bg-opacity-20 text-neutral sticky w-full mb-5 p-4 px-6">
        <Link href='/' className="flex gap-2 items-center justify-center">
          <Image
            src='/logo.png'
            alt='logo'
            width={45}
            height={45}
            className="object-contain"
          />
          <p className="text-lg font-bold" >LinguaLive</p>
        </Link>

      <DesktopNav session={session} />
      <MobileNav session={session} />
    </nav>
  )
}

export default Nav;