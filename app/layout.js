import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { Rethink_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const rethink_sans = Rethink_Sans({
  weights: [400, 600, 700],
  subsets: ["latin"],
});

export const metadata = {
  title: "Ethical Spectacle Research",
  description:
    "A community of researchers, developers, and entrepreneurs coming together at events to further tech ethics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rethink_sans.className}>
        <AuthProvider>
          <NavBar />
          {children}
          <Footer />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
