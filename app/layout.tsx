import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { AppProviders } from "@/components/providers/AppProviders";
import { getSiteOrigin } from "@/lib/site";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F5F1" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: "Neodeeps · Portfolio",
    template: "%s · Neodeeps",
  },
  description:
    "A designer and creator portfolio with client-side CRUD, ready to deploy on GitHub Pages.",
  applicationName: "Neodeeps Portfolio",
  authors: [{ name: "Neodeeps" }],
  keywords: [
    "portfolio",
    "designer",
    "brand identity",
    "editorial",
    "packaging",
  ],
  openGraph: {
    title: "Neodeeps · Portfolio",
    description:
      "A designer and creator portfolio with client-side CRUD, ready to deploy on GitHub Pages.",
    type: "website",
    locale: "en_US",
    siteName: "Neodeeps",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neodeeps · Portfolio",
    description:
      "A designer and creator portfolio with client-side CRUD, ready to deploy on GitHub Pages.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeBootScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEYS.theme}");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);else document.documentElement.setAttribute("data-theme","light");var l=localStorage.getItem("${STORAGE_KEYS.locale}");if(l==="en"||l==="id")document.documentElement.setAttribute("lang",l)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <AppProviders>
          <SkipToContent />
          <Navbar />
          <div
            id="main-content"
            tabIndex={-1}
            className="flex flex-1 flex-col outline-none"
          >
            {children}
          </div>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
