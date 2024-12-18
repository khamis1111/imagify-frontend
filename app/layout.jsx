import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AppContextProvider from "@/context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const outFit = localFont({
  src: "./fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outFit-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outFit.variable} antialiased bg-gradient-to-b from-[#F2FFF9] to-[#FFF6F1] min-h-screen`}
      >
        <ClerkProvider publishableKey={publishableKey}>
          <AppContextProvider>
            <Navbar />
            {children}
          </AppContextProvider>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
