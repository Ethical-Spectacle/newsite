import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import { LoggedContextProvider } from "./context/store";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ethical Spectacle Research",
  description: "A community of researchers, developers, and entrepreneurs coming together at events to further tech ethics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

        <head>
          <link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
        </head>

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
