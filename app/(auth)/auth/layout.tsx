export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="flex-center min-h-screen py-6">
         {children}
      </main>
   );
}
