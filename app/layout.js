import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import { LoggedContextProvider } from "./context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ethical Spectacle Research",
  description: "A community of researchers, developers, and entrepreneurs coming together at events to .",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <LoggedContextProvider>
            <NavBar />
            {children}
            <Footer />
          </LoggedContextProvider>

      </body>
    </html>
  );
}
