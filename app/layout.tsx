import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "US AI Infrastructure Buildout Tracker | $290B+ Mega-Investment Map",
  description: "Track the $290B+ AI data center investment wave reshaping rural America — facilities, jobs, fiscal impact, energy costs, and the net verdict.",
  openGraph: {
    title: "US AI Infrastructure Buildout Tracker",
    description: "Track the $290B+ AI data center investment wave reshaping rural America.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
