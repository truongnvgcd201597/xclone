"use client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserProfile = () => {
  const { data: session } = useSession();
  return (
    <>
      {session && (
        <div className="flex items-center gap-2">
          <Image
            src={session.user.image}
            width={50}
            height={50}
            alt="profile"
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col">
            <p className="text-xs font-bold ml-2">{session.user.name}</p>
            <p className="text-xs font-medium ml-2">{session.user.username}</p>
          </div>
          <BsThreeDotsVertical />
        </div>
      )}
    </>
  );
};

export default UserProfile;
