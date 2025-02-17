import Link from "next/link";
import React from "react";
import { IoMdHome } from "react-icons/io";
import AuthButton from "./AuthButton";
import UserProfile from "./UserProfile";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full justify-between px-2 py-4">
      <div className="flex flex-col items-start gap-6">
        <Link href="/">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-lrsllp r-1nao33i r-16y2uox r-8kz0gk"
            width="30"
            height="30"
          >
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 hover:bg-gray-200 rounded-full transition-all duration-300"
        >
          <IoMdHome className="text-3xl" />
          <p className="text-xl font-bold text-center hidden md:block">Home</p>
        </Link>
        <AuthButton />
      </div>
      <UserProfile />
    </div>
  );
};

export default Sidebar;
