import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";

type DesktopNavProps = {
  session: Session | null
}

const DesktopNav = ({session}: DesktopNavProps) => {
  return (
    <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-2 md:gap-5">
            <button className="btn btn-outline" onClick={() => signOut()}>Sign Out</button>
            <Link className="flex items-center" href='/profile'>
            <Image src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
            <>
              <button onClick={() => signIn()} className="btn btn-primary">Sign In</button>
            </>
        )}
      </div>
  )
}

export default DesktopNav