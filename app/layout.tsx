import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fashion e-Store",
  description: "Built with Next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <>{children}</>
        <Toaster richColors position="top-right" expand />
      </body>
    </html>
  );
}
