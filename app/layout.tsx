import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
   weight: ["300", "400", "500", "700"],
   subsets: ["latin"],
});

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
            <body className={roboto.className}>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  {children}
               </ThemeProvider>
            </body>
         </html>
      </ClerkProvider>
   );
}
