import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/app/NavBar/NavBar";

export const metadata: Metadata = {
  title: "Clarence Siew",
  description: "Software Engineer",
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
      </body>
    </html>
  );
}
