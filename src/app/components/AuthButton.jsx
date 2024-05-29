"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button
          className="py-2 px-6 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all duration-300 brightness-90 active:brightness-100 active:scale-95 shadow-md"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className="py-2 px-6 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all duration-300 brightness-90 active:brightness-100 active:scale-95 shadow-md hidden xl:block"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </>
  );
};

export default AuthButton;
