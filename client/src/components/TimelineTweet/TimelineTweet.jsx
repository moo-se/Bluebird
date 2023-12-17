import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Tweet from "../Tweet/Tweet";

const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeLineTweet = await axios.get(
          `/tweets/timeline/${currentUser._id}`
        );
        setTimeLine(timeLineTweet.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser._id]);
  console.log(timeLine);
  return (
    <div className="mt-6">
      {timeLine &&
        timeLine.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setTimeLine} />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweet;
