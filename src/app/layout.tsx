import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "../components/app/NavBar/NavBar";
import Footer from "../components/app/Footer/Footer";

export const metadata: Metadata = {
  title: "Clarence Siew",
  description: "Software Engineer",
  generator: "Next.js",
  applicationName: "Clarence Siew",
  keywords: [
    "Clarence Siew",
    "clarence",
    "siew",
    "software engineer",
    "software",
    "engineer",
    "illume OS",
    "Tab Shelf",
    "Antorca"
  ],
  icons: {
    icon: "/profile.jpg",
    shortcut: "/profile.jpg"
  }
};

export const viewport: Viewport = {
  themeColor: "rgb(150, 50, 50)"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
