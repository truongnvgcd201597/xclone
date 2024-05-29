"use client";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../api/firebase";
import Tweet from "./Tweet";

const NewFeed = () => {
  const [feed, setFeed] = useState([]);

  const readDataFromFireStore = async () => {
    const querySnapshot = await getDocs(collection(db, "tweets"));
    const tweets = [];
    querySnapshot.forEach((doc) => {
      tweets.push({ id: doc.id, ...doc.data() });
    });
    setFeed(tweets);
  };

  useEffect(() => {
    readDataFromFireStore();
  }, []);

  return (
    <div className="flex flex-col">
      {feed.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default NewFeed;
