import { MediaRenderer } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { CommentIcon, LikeIcon, SaveIcon, SendIcon } from "./ImportantIcons";
import { format } from "timeago.js";

type Props = {};

function Post({}: Props) {
  const [open, setOpen] = useState<boolean>(true);

  const styles = {};

  return (
    <div className="w-full  lg:w-[500px]  border-b-[1px] pb-[20px] border-gray-300 text-sm">
      {/* post header */}
      <div className={"w-full text-sm h-14 flex items-center justify-between"}>
        <div className="flex items-center justify-center gap-2">
          <span className="w-8 h-8 border-[1px] bg-white block rounded-full"></span>
          <div className="flex gap-1">
            <span className="font-semibold hover:text-gray-400 cursor-pointer"></span>
            <span>•</span>
            <span className="text-gray-400"></span>
          </div>
        </div>
        <span className="cursor-pointer hover:text-gray-400 text-lg">
          <BsThreeDots />
        </span>
      </div>

      {/* post body */}
      <div className="w-full relative object-contain">
        <MediaRenderer
          // @ts-ignore
          src={""}
          alt={"post"}
          style={{
            width: "100%",
          }}
        />
      </div>

      {/* post bottom */}

      <div className="mt-[4px]">
        {/* important options */}
        <div className="flex items-center justify-between pb-[6px]">
          <div className="flex gap-4">
            <span className="py-2">
              <LikeIcon />
            </span>
            <span className="py-2">
              <CommentIcon />
            </span>
            <span className="py-2">
              <SendIcon />
            </span>
          </div>
          <span className="py-2">
            <SaveIcon />
          </span>
        </div>
      </div>

      {/* likes */}
      <div className="mb-2">
        <span className="font-semibold text-sm "></span>
      </div>

      {/* post info */}
      <div className=" flex mb-2">
        <span className="font-semibold "></span>
        <p
          className={open ? "line-clamp-1 text-gray-600" : "text-gray-600"}
        ></p>
        <span
          className="font-semibold text-right mt-auto cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          &nbsp;&nbsp;{open ? "more" : "close"}
        </span>
      </div>

      {/* comments */}
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-400">View all comments</span>
        <input
          type="text"
          name="comment"
          className="border-none outline-none"
          placeholder="Add a comment"
        />
      </div>
    </div>
  );
}

export default Post;
