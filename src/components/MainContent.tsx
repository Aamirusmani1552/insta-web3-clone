import React from "react";
import Post from "./Post";
import SideProfile from "./SideProfile";
import ConnectWithCyberConnect from "./ConnectWithCyberConnect";

type Props = {};

function MainContent({}: Props) {
  return (
    <div className="w-full flex min-h-full  px-0 md:px-20 flex-1 md:w-400px">
      <div className=" w-full   px-2 md:px-0 pb-12">
        <div className="py-4 md:flex items-center justify-end hidden ">
          <ConnectWithCyberConnect />
        </div>
        {/* posts will come here */}
      </div>
      {/* <SideProfile /> */}
    </div>
  );
}

export default MainContent;
