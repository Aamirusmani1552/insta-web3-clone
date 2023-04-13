import React from "react";
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

        <div>these are the posts</div>
      </div>
      {/* <SideProfile /> */}
    </div>
  );
}

export default MainContent;
