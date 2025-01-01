import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { defaultmetadata } from "./metadata";
import { Viewport } from "next";

export const metadata = defaultmetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background-dark">
        <div className="container mx-auto sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1600px]">
          <div className="text-center space-y-2 mb-8 sm:mb-12 lg:mb-16">
            <Link href="/">
              <h1
                className={`
                  text-4xl font-extrabold text-vanilla font-sans 
                  cursor-pointer hover:opacity-80 
                  transition-all duration-300 ease-out
                  hover:brightness-110
                `}
              >
                🐉Dragon Egg🥚
                <br />
                Gallery
              </h1>
            </Link>
            <p className="text-vanilla/80 text-lg font-sans font-medium">
              ✨ It all starts with an egg ✨
            </p>
          </div>
          {children}
          <Analytics />

          {/* Decorative bottom border */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-vanilla/20 rounded-full" />
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-vanilla/15 rounded-full" />
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-vanilla/10 rounded-full" />
          </div>

          {/* Footer note */}
          {/*           <div className="text-center mt-6 sm:mt-8">
            <span className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-vanilla/10 rounded-full text-vanilla/80 text-xs sm:text-sm font-medium tracking-wide">
              ✨ A cute little dragon egg database ✨
            </span>
          </div> */}
        </div>
      </body>
    </html>
  );
}
