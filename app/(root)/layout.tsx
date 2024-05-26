import Header from "@/components/shared/Header";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
         <Header />
         <main className="max-w-screen-xl mx-auto max-lg:px-3 mt-12">{children}</main>
      </main>
   );
}
