"use client";
import React, { useState, useEffect } from "react";
import NewsApi from "../api/newsAPI";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      setIsLoading(true);
      try {
        const fetchedArticles = await NewsApi.getHealthHeadlines();
        setArticles(fetchedArticles);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div className="flex flex-col gap-4 border-l-2 p-4 h-screen sticky top-0">
      <input
        type="text"
        placeholder="Search..."
        className="py-2 px-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <div className="bg-gray-100 rounded-lg p-2">
        <h2 className="text-xl font-bold">What&apos;s happening</h2>
        {isLoading ? (
          <p>Loading health headlines...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : articles.length === 0 ? (
          <p>No health headlines found.</p>
        ) : (
          <ul>
            <AnimatePresence>
              {(showMore ? articles : articles.slice(0, 3)).map((article) => (
                <motion.li
                  key={article.url}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2 hover:bg-gray-200 flex p-2"
                >
                  <Link href={article.url}>
                    <h4 className="text-md font-bold">
                      {article.title.slice(0, 70)}...
                    </h4>
                    <p className="text-sm text-gray-500">{article.author}</p>
                  </Link>
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-20 h-16 rounded-lg bg-cover bg-center bg-no-repeat"
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
        <button
          className="w-full bg-gray-200 text-black font-bold p-2 transition-all duration-300 hover:bg-gray-300"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
};

export default News;
