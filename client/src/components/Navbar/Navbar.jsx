import React from "react";

const Navbar = () => {
  return (
    <div className="grid grid-col-1 md:grid-cols-4 my-5 justify-center ">
      <div className=" mx-auto md:mx-0">
        <img
          src="/twitter-logo.png"
          alt="Twitter Logo"
          width={"40px"}
          className="ml-8"
        ></img>
      </div>
      <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0"></div>
    </div>
  );
};

export default Navbar;
