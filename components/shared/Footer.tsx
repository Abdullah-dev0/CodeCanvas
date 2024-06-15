import Image from "next/image";
import Link from "next/link";

export function Footer() {
   return (
      <footer className="border-t py-6">
         <div className="flex justify-center items-center gap-3 sm:flex-row">
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
         <div className="flex gap-2 justify-center sm:flex-row">
            <p> Developed by</p>
            <p className="">💖</p>
            <Link
               href="https://github.com/Abdullah-dev0"
               target="_blank"
               className="underline text-[17px] text-blue-700"
            >
               Abdullah razzaq
            </Link>
         </div>
      </footer>
   );
}
