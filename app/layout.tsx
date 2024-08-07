import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/header";
import { ScrollToTop } from "@/components/shared";
import { Footer } from "@/components/footer";
import "./globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { saveUserDetails } from "@/lib/user/saveUserDetails";

const bai_Jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GasTrack",
  description:
    "Simplify your LPG management with GasTrack. Book refills, track order status in real-time, and ensure safe and reliable LPG delivery.",
  metadataBase: new URL(`${process.env.KINDE_SITE_URL}`),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user && user.id) {
    await saveUserDetails();
  }

  return (
    <html lang="en">
      <body className={`${bai_Jamjuree.className} text-lg`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            containerStyle={{
              top: 40,
            }}
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #713200",
                color: "#713200",
              },
            }}
            position="top-center"
            reverseOrder={false}
          />
          <Navbar />
          <main>{children}</main>
          <ScrollToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
