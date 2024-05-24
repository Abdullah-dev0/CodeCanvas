import Header from "@/components/shared/Header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "CodeCanvas",
   description: "A website to show your Projects",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ClerkProvider
         appearance={{
            baseTheme: [dark],
            variables: { colorPrimary: "red" },
            signIn: {
               baseTheme: [shadesOfPurple],
               variables: { colorPrimary: "white" },
            },
            signUp: {
               baseTheme: [shadesOfPurple],
            },

            layout: {
               socialButtonsPlacement: "bottom",
            },
         }}
      >
         <html lang="en">
            <body className={inter.className}>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  <Header />
                  {children}
               </ThemeProvider>
            </body>
         </html>
      </ClerkProvider>
   );
}
