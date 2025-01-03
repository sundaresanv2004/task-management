import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import {Toaster} from "@/components/ui/toaster";
import AuthProvider from "@/app/auth/Provider";

const SpaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.woff",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "ManageIt",
  description: "Manage you task with ManageIt",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`${SpaceGrotesk.className} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <AuthProvider>
              {children}
          </AuthProvider>
          <Toaster />
      </ThemeProvider>
      </body>
    </html>
  );
}
