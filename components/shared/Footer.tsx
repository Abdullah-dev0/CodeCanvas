import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-3">
        <Link href="/">
          <Image src="/assets/logo.png" alt="logo" width={40} height={40} />
        </Link>

        <p className="text-center sm:text-left">2024 codecanvas. All Rights reserved.</p>
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-center mt-4">
        <p className="mb-2 sm:mb-0">Developed by</p>

        <p className="mx-2">💖</p>

        <Link href="https://github.com/Abdullah-dev0" target="_blank" className="underline text-blue-700">
          Abdullah
        </Link>
      </div>
    </footer>
  );
}
