import Image from "next/image";
import React from "react";

const Tweet = ({ tweet }) => {
  const { name, username, userImage, imageLink, content } = tweet;
  return (
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
        <p className="text-sm">{content}</p>
        <img
          src={imageLink}
          alt="tweet"
          className="w-full h-60 object-cover mt-2 rounded-lg shadow-lg border"
        />
      </div>
    </div>
  );
};

export default Tweet;
