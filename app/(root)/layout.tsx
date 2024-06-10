import { Footer } from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
         <Header />
         <main className="max-w-screen-xl mx-auto max-lg:px-4 mt-12 py-8">
            {children}
         </main>
         <Footer />
      </main>
   );
}
