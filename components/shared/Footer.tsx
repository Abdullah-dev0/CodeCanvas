import Image from "next/image";
import Link from "next/link";

export function Footer() {
   return (
      <footer className="border-t py-6">
         <div className="flex-center wrapper flex-between flex flex-col gap-4 text-center sm:flex-row">
            <Link href="/">
               <Image
                  src="/assets/logo.png"
                  alt="logo"
                  width={40}
                  height={40}
               />
            </Link>

            <p>2024 codecanvas. All Rights reserved.</p>
         </div>
         <p className="text-center">
            Developed by
            <span className="px-2">💖</span>
            <Link href="https://github.com/Abdullah-dev0" target="_blank" className="underline text-[17px] text-blue-700">Abdullah</Link>
         </p>
      </footer>
   );
}
