export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="flex justify-center items-center min-h-screen">
         {children}
      </main>
   );
}
