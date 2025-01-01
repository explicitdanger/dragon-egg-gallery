import { Metadata } from "next";

export const defaultmetadata: Metadata = {
    metadataBase: new URL("https://dragon-egg-gallery.vercel.app"),
    title: {
        template: "%s | Dragon Egg Gallery",
        default: "Dragon Egg Gallery",
    },
    description: "Dragon Egg Gallery",
    applicationName: "Dragon Egg Gallery",
    authors: [
        {
            name: "explicitdanger",
            url: "https://github.com/explicitdanger",
        },
    ],
    generator: "Next.js",
    keywords: ["Dragon Egg Gallery", "Dragon Egg", "Dragon", "Egg", "Gallery", "dvc", "dragon village collection", "Personality Preview", "dragon preview"],
    creator: "explicitdanger",
    publisher: "explicitdanger",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://dragon-egg-gallery.vercel.app",
    },
    manifest: "/manifest.webmanifest",
    verification: {
        google: "0iLmhY0bYkc_cPb4ISSuFwolpoxRU9JFkzarJs4OywI",
    },
    assets: "https://dragon-egg-gallery.vercel.app/",
    category: "gaming",
    classification: "Games",
    icons: {
        icon: "/favicon-96x96.png",
        apple: "/apple-touch-icon.png",
        other: [
            {
                rel: "icon",
                url: "/favicon-96x96.png",
            },
        ],
    },
    openGraph: {
        type: "website",
        url: "https://dragon-egg-gallery.vercel.app",
        title: "Dragon Egg Gallery",
        description: "Dragon Egg Gallery",
        siteName: "Dragon Egg Gallery",
        images: [
            {
                url: "/images/favicon-96x96.png",
            },
        ],
    },
};
