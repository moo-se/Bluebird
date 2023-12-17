import React, { useState } from "react";
import { useSelector } from "react-redux";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import axios from "axios";

const MainTweet = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tweetText, setTweetText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTweet = await axios.post("/tweets", {
        userId: currentUser._id,
        description: tweetText,
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  //update or delete tweet
  //sort timeline tweet

  return (
    <>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}
      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <div>
        <TimelineTweet />
      </div>
    </>
  );
};

export default MainTweet;
