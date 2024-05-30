import Image from "next/image";
import React from "react";
import Status from "./Status";
import Link from "next/link";

const Tweet = ({ tweet }) => {
  const { id, name, username, userImage, imageLink, content } = tweet;
  return (
    <Link href={`/posts/${id}`}>
      <div className="flex items-start m-4 gap-4 w-full">
        <Image
          src={userImage}
          width={50}
          height={50}
          alt="profile"
          className="rounded-full w-12 h-12"
        />
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">{name}</p>
            <p className="text-xs font-medium text-gray-500">{username}</p>
          </div>
          <p className="text-md mt-2">{content}</p>
          <img
            src={imageLink}
            alt="tweet"
            className="w-[100%] h-60 object-cover rounded-xl mt-4"
          />
          <Status id={id} />
        </div>
      </div>
    </Link>
  );
};

export default Tweet;
