import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar.jsx";
import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";
import SignIn from "../../pages/Signin/Signin.jsx";
import ExploreTweets from "../../components/ExploreTweets/ExploreTweets.jsx";
import { useSelector } from "react-redux";

const Explore = () => {
  const currentUser = useSelector((state) => state.user);
  return (
    <>
      {!currentUser ? (
        <SignIn />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6 ">
            <ExploreTweets />
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
