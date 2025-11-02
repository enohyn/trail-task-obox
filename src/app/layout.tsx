import type { Metadata } from "next";
import "./globals.css";
import { domine } from "./fonts/domine";
import { domaineDisplayNarrow } from "./fonts/domaine-display-narrow";

export const metadata: Metadata = {
  title: "Hall of Nature",
  description: "Immersive nature carousel with cinematic transitions",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${domine.variable} ${domaineDisplayNarrow.variable} antialiased overflow-x-hidden`}>
          {children}
      </body>
    </html>
  );
}