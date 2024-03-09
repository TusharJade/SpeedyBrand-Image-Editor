import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/store/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpeedyBrand Image editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer autoClose={2000} />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
