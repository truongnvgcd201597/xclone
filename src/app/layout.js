import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import News from "./components/News";
import SessionWrapper from "./components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X Clone",
  description: "X Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className}>
          <div className="flex justify-between h-screen max-w-6xl mx-auto">
            <div className="flex justify-center items-start w-1/5 border-r-2">
              <Sidebar />
            </div>
            <div className="w-3/5">{children}</div>
            <div className="w-2/5 hidden md:block">
              <News />
            </div>
          </div>
        </body>
      </SessionWrapper>
    </html>
  );
}
