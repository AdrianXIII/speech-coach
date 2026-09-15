import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MasterSpeak",
  description: "AI-powered public speaking coaching for professionals who want domain knowledge and confident communication.",
  manifest: "/manifest.webmanifest",
  applicationName: "MasterSpeak",
  appleWebApp: {
    capable: true,
    title: "MasterSpeak",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "public speaking",
    "business English",
    "AI coaching",
    "professionals",
    "speech practice",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${sourceSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        <LanguageProvider>
          <NavBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
