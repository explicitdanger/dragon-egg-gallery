import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export const metadata: Metadata = {
  title: "eggs",
  description: "A collection of dragon eggs",
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
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
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
