import Header from "@/components/shared/Header";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
         <Header />
         {children}
      </main>
   );
}
