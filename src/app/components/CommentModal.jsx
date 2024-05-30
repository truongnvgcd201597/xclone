"use client";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";

const CommentModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const { data: session } = useSession();

  const fetchPostData = useCallback(async () => {
    if (postId) {
      setLoading(true);
      try {
        const docSnap = await getDoc(doc(db, "tweets", postId));
        if (docSnap.exists()) {
          setTweet(docSnap.data());
          setError("");
        } else {
          setError("No such document!");
        }
      } catch (error) {
        setError("Error fetching document.");
      } finally {
        setLoading(false);
      }
    }
  }, [postId]);

  const handleUpdateComment = async () => {
    if (!comment) {
      setError("Comment cannot be empty");
      return;
    }
    if (!session) {
      signIn();
      return; 
    }
    try {
      const docRef = doc(db, "tweets", postId);
      await updateDoc(docRef, {
        comments: arrayUnion({
          userId: session.user.uid,
          username: session.user.name,
          comment: comment,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setComment("");
      setIsOpen(false);
      setPostId(null);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setPostId(null);
    setTweet(null);
    setError("");
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black/60"
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-2xl cursor-pointer rounded-full p-1 hover:bg-gray-200"
          onClick={handleCloseModal}
          aria-label="Close modal"
        >
          <IoMdClose />
        </button>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div>
            <div className="flex items-start gap-2">
              <img
                src={tweet?.imageLink}
                width={50}
                height={50}
                alt="profile"
                className="rounded-full w-12 h-12"
              />
              <div className="flex flex-col">
                <p className="text-sm font-bold">{tweet?.name}</p>
                <p className="text-sm font-medium text-gray-500">
                  @{tweet?.username}
                </p>
                <div className="w-full mt-2">
                  <p className="text-md">{tweet?.content}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2">
              <img
                src={session?.user?.image}
                width={50}
                height={50}
                alt="profile"
                className="rounded-full w-12 h-12"
              />
              <div className="flex items-end justify-end w-full">
                <textarea
                  className="w-full rounded-lg p-2 outline-none"
                  cols="30"
                  rows="4"
                  name="comment"
                  id="comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  placeholder="Write a comment..."
                />
                <button
                  className="mt-4 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
                  onClick={handleUpdateComment}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ReactModal>
  );
};

export default CommentModal;
