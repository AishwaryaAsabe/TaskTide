import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskTide",
  description: "A project management app for clients and freelancers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navbar is always visible and handles different states internally */}
        <Navbar />

        {/* Toaster component for global notifications */}
        <Toaster position="top-right" reverseOrder={false} />

        {/* Main content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
