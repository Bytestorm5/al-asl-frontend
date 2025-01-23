import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import MenuOverlay from "@/components/ui/menu-overlay";
import routes from "@/constants/routes";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  const pathname = headers().get("x-pathname");

  const route = routes.find((route) => route.href === pathname);

  return {
    title: route ? `Azharul Jannah — ${route.name}` : "Azharul Jannah",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <MenuOverlay />
        {children}
        <Footer />
      </body>
    </html>
  );
}
