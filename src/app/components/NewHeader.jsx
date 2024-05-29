"use client";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoMdImages } from "react-icons/io";
import { db, storage } from "../api/firebase";
import { addDoc, collection } from "firebase/firestore";

const NewHeader = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageLink, setImageLink] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddContentToFireStore = async () => {
    if (!imageLink) return;

    try {
      const docRef = await addDoc(collection(db, "tweets"), {
        name: session.user.name,
        userImage: session.user.image,
        username: session.user.username,
        userId: session.user.uid,
        imageLink: imageLink,
        timestamp: new Date(),
        content: tweet,
        like: [],
        comment: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setTweet("");
      setImage(null);
      setImageLink(null);
      setProgress(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageLink) {
      handleAddContentToFireStore();
    }
  }, [imageLink]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageLink(downloadURL);
          });
          setLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-sm border-b">
      <h1 className="text-2xl font-bold pb-2">Homepage</h1>
      <div className="h-[2px] w-full bg-gray-300 mb-4"></div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-4 mb-4">
          <Image
            src={session?.user.image || "/default-profile.png"}
            width={50}
            height={50}
            alt="profile"
            className="rounded-full w-12 h-12 object-cover"
          />
          <textarea
            className="w-full h-20 p-4 resize-y border-none focus:outline-none"
            placeholder="What's on your mind?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          ></textarea>
        </div>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="image"
            className="w-full h-64 object-cover rounded-xl mb-4 shadow-md border"
          />
        )}
        <div className="flex items-center justify-between">
          <label htmlFor="file-input" className="cursor-pointer">
            <IoMdImages className="text-4xl bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-all duration-300" />
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all duration-300 brightness-90 active:brightness-100 active:scale-95 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={loading || tweet === "" || image === null}
          >
            Post
          </button>
        </div>
        {progress > 0 && (
          <div className="w-full bg-gray-200 h-1 mt-4">
            <div
              className="bg-blue-500 h-1"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewHeader;
