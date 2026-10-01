import type { Metadata } from "next";
import localFont from "next/font/local";

import { AppProviders } from "./providers";

import "./globals.css";

const sanaSans = localFont({
  src: [
    { path: "./fonts/Sana-Sans-Alt-W00-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Sana-Sans-Alt-W00-Bold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-sana",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Auchan Back-office",
    template: "%s | Auchan Back-office",
  },
  description: "Back-office de gestion des magasins, caissiers et transactions Auchan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${sanaSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
