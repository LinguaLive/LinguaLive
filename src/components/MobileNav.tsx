import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";

type MobileNavProps = {
  session: Session | null
}

const MobileNav = ({ session }: MobileNavProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={()=>setToggleDropdown((prev) => !prev)}
            />
            
            {toggleDropdown && (
              <div className="dropdown dropdown-end">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={()=> setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                className="mt-5 w-full btn btn-neutral btn-sm rounded-full">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type='button'
              onClick={() => signIn()}
              className="btn btn-primary"
            >
              Sign In
            </button>
          </>
        )}
      </div>
  )
}

export default MobileNav;