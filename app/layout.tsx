import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GasTrack",
  description:
    "Simplify your LPG management with GasTrack. Book refills, track order status in real-time, and ensure safe and reliable LPG delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.className} text-lg`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
        <main>{children}</main>
        <Footer />
        </ThemeProvider>
      
      </body>
    </html>
  );
}
