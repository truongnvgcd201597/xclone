import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { db } from "../api/firebase";

const Status = ({ id }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchPostData = async () => {
      const docRef = doc(db, "tweets", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(data.like || []);
        setLiked(data.like.includes(session.user.uid));
        setIsOwner(data.userId === session.user.uid);
      }
    };

    if (session) {
      fetchPostData();
    }
  }, [id, session]);

  const handleLike = async () => {
    const docRef = doc(db, "tweets", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (liked) {
        await updateDoc(docRef, {
          like: arrayRemove(session.user.uid),
        });
        setLikes(likes.filter((uid) => uid !== session.user.uid));
      } else {
        await updateDoc(docRef, {
          like: arrayUnion(session.user.uid),
        });
        setLikes([...likes, session.user.uid]);
      }
      setLiked(!liked);
    }
  };

  const handleDelete = async () => {
    const docRef = doc(db, "tweets", id);
    await deleteDoc(docRef);
    window.location.reload();
  };

  return (
    <div className="flex justify-start items-center gap-8 mt-4 ml-2">
      <AiOutlineMessage className="text-2xl text-gray-500 hover:text-blue-500 transition-all duration-300 cursor-pointer hover:scale-110" />
      <div onClick={handleLike} className="cursor-pointer">
        {liked ? (
          <FaHeart className="text-2xl text-red-500 hover:scale-110 transition-all duration-300" />
        ) : (
          <FaRegHeart className="text-2xl text-gray-500 hover:text-blue-500 transition-all duration-300 hover:scale-110" />
        )}
      </div>
      {isOwner && (
        <FaRegTrashCan
          onClick={handleDelete}
          className="text-2xl text-gray-500 hover:text-blue-500 transition-all duration-300 cursor-pointer hover:scale-110"
        />
      )}
    </div>
  );
};

export default Status;
