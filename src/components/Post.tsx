import { MediaRenderer } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { CommentIcon, LikeIcon, SaveIcon, SendIcon } from "./ImportantIcons";
import axios from "axios";
import { EssenceMetadata } from "@/Types/__generated__/graphql";
import Image from "next/image";
import ProfileImage from "../../public/profile.png";
import { AiFillHeart } from "react-icons/ai";
import TimeAgo from "timeago-react";
import useLike from "@/hooks/useLike";
import { IoMdSend } from "react-icons/io";
import useComment from "@/hooks/useComment";
import useGetUserCCProfile from "@/hooks/auth/useGetUserCCProfile";
import Link from "next/link";

type Props = {
  data: {
    __typename?: "EssenceEdge";
    node?: {
      __typename?: "Essence";
      essenceID: number;
      tokenURI: any;
      contractAddress?: any | null;
      contentID: string;
      commentCount: number;
      likeCount: number;
      createdBy: {
        __typename?: "Profile";
        handle: string;
        avatar?: any | null;
        profileID: number;
      };
      metadata?: {
        __typename?: "EssenceMetadata";
        tags?: Array<string> | null;
        issue_date?: string | null;
        description?: string | null;
      } | null;
      likedStatus: {
        __typename?: "ContentLikeStatus";
        disliked: boolean;
        liked: boolean;
      };
    } | null;
  } | null;
};

function Post({ data }: Props) {
  const [open, setOpen] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const [liked, setLiked] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [commentMessage, setCommentMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { handle, getUserCCProfile } = useGetUserCCProfile();
  const { comment } = useComment();
  const { like } = useLike();

  useEffect(() => {
    if (image?.length > 0) return;

    data &&
      axios
        .get<EssenceMetadata>(data.node?.tokenURI)
        .then((data) => {
          setImage(data.data.image);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [data, image]);

  useEffect(() => {
    if (!data) return;

    setLiked(data.node?.likedStatus.liked);
    setLikeCount(data.node?.likeCount ? data.node.likeCount : 0);
    setCommentCount(data.node?.commentCount ? data.node.commentCount : 0);
    getUserCCProfile();
  }, [data, handle, getUserCCProfile]);

  return (
    <div className="w-full  lg:w-[500px]  border-b-[1px] pb-[20px] border-gray-300 text-sm">
      {/* post header */}
      <div className={"w-full text-sm h-14 flex items-center justify-between"}>
        <div className="flex items-center justify-center gap-2">
          <span className="w-8 h-8 border-[1px] bg-white block rounded-full relative overflow-hidden">
            <Image
              src={
                data?.node?.createdBy.avatar
                  ? data.node.createdBy.avatar
                  : ProfileImage
              }
              alt="avatar"
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <div className="flex gap-1">
            <span className="font-semibold hover:text-gray-400 cursor-pointer">
              {data?.node?.createdBy.handle}
            </span>
            <span>•</span>
            <span className="text-gray-400">
              <TimeAgo
                datetime={data?.node?.metadata?.issue_date || "2023-03-04"}
              />
            </span>
          </div>
        </div>
        <span className="cursor-pointer hover:text-gray-400 text-lg">
          <BsThreeDots />
        </span>
      </div>

      {/* post body */}
      <div className="w-full h-[400px] md:h-[500px] relative object-contain">
        {image.length > 0 && (
          <MediaRenderer
            src={image}
            alt="post"
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
          />
        )}
      </div>

      {/* post bottom */}

      <div className="mt-[4px]">
        {/* important options */}
        <div className="flex items-center justify-between pb-[6px]">
          <div className="flex gap-4">
            {liked ? (
              <span className="py-2 text-instaRed cursor-pointer text-2xl">
                <AiFillHeart />
              </span>
            ) : (
              <span
                className="py-2 cursor-pointer"
                onClick={async () => {
                  if (loading) return;
                  setLoading(true);
                  let result = await like(
                    data?.node?.contentID ? data.node.contentID : ""
                  );
                  if (result) {
                    setLiked(true);
                    setLikeCount((prev) => prev + 1);
                  }

                  setLoading(false);
                }}
              >
                <LikeIcon />
              </span>
            )}
            <span className="py-2 cursor-pointer">
              <Link href={`/comment/${data?.node?.contentID}`}>
                <CommentIcon />
              </Link>
            </span>
            <span className="py-2 cursor-pointer">
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
        <span className="font-semibold text-sm ">
          Liked by {likeCount} people
        </span>
      </div>

      {/* post info */}
      <div className=" flex mb-2">
        <span className="font-semibold "></span>
        <p className={open ? "line-clamp-1 text-gray-600" : "text-gray-600"}>
          {data?.node?.metadata?.description}
        </p>
        <span
          className="font-semibold text-right mt-auto cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          &nbsp;&nbsp;{open ? "more" : "close"}
        </span>
      </div>

      {/* comments */}
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-400">
          View all {commentCount} comments
        </span>
        <div className="flex gap-2 items-center w-full">
          <input
            type="text"
            name="comment"
            className="border-none outline-none flex-1 bg-white"
            placeholder="Add a comment"
            value={commentMessage}
            disabled={loading}
            onChange={(e) => {
              setCommentMessage(e.target.value);
            }}
          />
          <div
            className="text-xl cursor-pointer"
            onClick={async () => {
              if (loading) return;
              if (commentMessage.length == 0) return;

              setLoading(true);
              let result = await comment(data?.node?.contentID!, {
                author: handle,
                body: commentMessage,
                title: "Comment",
              });

              if (result) {
                setCommentCount((prev) => prev + 1);
              }
              setCommentMessage("");
              setLoading(false);
            }}
          >
            {!loading ? (
              <IoMdSend />
            ) : (
              <div className="w-4  h-4 rounded-full border-2 border-b-transparent animate-spin"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
