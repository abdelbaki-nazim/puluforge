import type { Metadata } from "next";
import AuthProvider from "@/./../context/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PuluForge | Build your cloud, your way.",
  description: "A self-service infrastructure management platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
      <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
