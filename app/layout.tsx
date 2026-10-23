import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { DemoBadge } from "@/components/layout/DemoBadge";
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
    default: "Neodeeps — Portfolio Demo",
    template: "%s · Neodeeps",
  },
  description:
    "Portfolio demo desainer/kreator dengan CRUD client-side, siap di-deploy ke GitHub Pages.",
  applicationName: "Neodeeps Portfolio Demo",
  authors: [{ name: "Neodeeps" }],
  keywords: [
    "portfolio",
    "designer",
    "brand identity",
    "editorial",
    "packaging",
    "demo",
  ],
  openGraph: {
    title: "Neodeeps — Portfolio Demo",
    description:
      "Portfolio demo desainer/kreator dengan CRUD client-side, siap di-deploy ke GitHub Pages.",
    type: "website",
    locale: "id_ID",
    siteName: "Neodeeps",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neodeeps — Portfolio Demo",
    description:
      "Portfolio demo desainer/kreator dengan CRUD client-side, siap di-deploy ke GitHub Pages.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeBootScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEYS.theme}");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);else document.documentElement.setAttribute("data-theme","light")}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
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
          <DemoBadge />
        </AppProviders>
      </body>
    </html>
  );
}
