import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GRADE APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div >
          <Navbar />
          <main className=" min-h-screen bg-gradient-to-b from-white via-white/90 to-teal-300">{children}</main>
        </div>
      </body>
    </html>
  );
}
