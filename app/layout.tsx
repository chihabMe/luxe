import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`  antialiased`}>
        <ThemeProvider>

        <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
