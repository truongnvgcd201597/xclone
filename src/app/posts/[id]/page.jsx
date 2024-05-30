"use client";
import { db } from "@/app/api/firebase";
import Status from "@/app/components/Status";
import Tweet from "@/app/components/Tweet";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const PostPage = () => {
  const pathName = usePathname();
  const getId = pathName.split("/")[2];
  const [tweet, setTweet] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    const fetchPostData = async () => {
      const docRef = doc(db, "tweets", getId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTweet(data);
      } else {
        console.log("No such document!");
      }
    };

    if (session && getId) {
      fetchPostData();
    }
  }, [session, getId]);

  return (
    <>
      <div className="flex items-center gap-2 py-4 pl-4 border-b-2 border-gray-300">
        <Link href="/">
          <FaArrowLeftLong className="text-4xl cursor-pointer rounded-full hover:bg-gray-200 transition-all duration-300 p-2" />
        </Link>
        <h1 className="text-2xl font-bold">Back</h1>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={tweet.userImage}
          width={50}
          height={50}
          alt="profile"
          className="rounded-full w-12 h-12"
        />
        <h3 className="text-sm font-bold">{tweet.name}</h3>
        <p className="text-xs font-medium text-gray-500">@{tweet.username}</p>
      </div>
      <div className="p-4">
        <img
          src={tweet.imageLink}
          alt="tweet"
          className="w-full h-60 object-cover rounded-xl"
        />
      </div>
      <Status id={getId} />
    </>
  );
};

export default PostPage;
