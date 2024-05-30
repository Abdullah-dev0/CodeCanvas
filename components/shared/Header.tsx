"use client";

import { ModeToggle } from "@/components/shared/Toggle";
import { navLinks } from "@/constant";
import {
   SignInButton,
   SignedIn,
   SignedOut,
   UserButton,
   useAuth,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
const Header = () => {
   const pathname = usePathname();
   const { isLoaded, userId } = useAuth();

   return (
      <header className="flex justify-between border-b border-slate-200 p-3 w-full items-center max-w-screen-xl mx-auto flex-wrap gap-2 max-sm:p-3">
         <div className="flex gap-12 items-center">
            <Link href="/">
               <Image
                  src="/assets/logo.png"
                  alt="CodeCanvas"
                  width={50}
                  height={50}
               />
            </Link>
            <SignedIn>
               <nav>
                  <ul className="flex gap-5">
                     {navLinks.map((link) => (
                        <li key={link.id}>
                           <Link
                              href={link.url}
                              className={`text-lg ${
                                 pathname === link.url ? "opacity-70" : ""
                              }`}
                           >
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </nav>
            </SignedIn>
         </div>
         <div className="flex items-center gap-5">
            <ModeToggle />
            <SignedOut>
               <SignInButton>
                  <Button>Sign in</Button>
               </SignInButton>
            </SignedOut>

            <SignedIn>
               <UserButton />
            </SignedIn>
         </div>
      </header>
   );
};

export default Header;
