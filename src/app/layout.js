import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import News from "./components/News";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X Clone",
  description: "X Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between h-screen max-w-6xl mx-auto mt-6">
          <div className="flex justify-center items-start w-1/5 border-r-2">
            <Sidebar />
          </div>
          <div>{children}</div>
          <div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
