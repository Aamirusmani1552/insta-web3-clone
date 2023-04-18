import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import ProfileImage from "../../public/profile.png";
import Image from "next/image";
import axios from "axios";
import { EssenceMetadata } from "@/Types/__generated__/graphql";
import { toast } from "react-hot-toast";
import useGetUserCCProfile from "@/hooks/auth/useGetUserCCProfile";
import TimeAgo from "timeago-react";
import { BsThreeDots } from "react-icons/bs";
import { MediaRenderer } from "@thirdweb-dev/react";
import { AiFillHeart } from "react-icons/ai";

type Props = {
  handle: string;
  data: {
    __typename?: "EssenceEdge" | undefined;
    node?:
      | {
          __typename?: "Essence" | undefined;
          name: string;
          tokenURI: any;
        }
      | null
      | undefined;
  } | null;
};

const ProfilePost = ({ data, handle }: Props) => {
  const [metadata, setMetadata] = useState<EssenceMetadata>();

  useEffect(() => {
    data?.node?.tokenURI &&
      axios
        .get<EssenceMetadata>(data?.node?.tokenURI)
        .then((d) => {
          setMetadata(d.data);
        })
        .catch((err) => {
          const error = err as Error;
          toast.error(error.message);
        });
  }, [data?.node?.tokenURI]);

  return (
    <div className="w-full  lg:w-[500px]  border-b-[1px] pb-[20px] border-gray-300 text-sm">
      {/* post header */}
      <div className={"w-full text-sm h-14 flex items-center justify-between"}>
        <div className="flex items-center justify-center gap-2">
          <span className="w-8 h-8 border-[1px] bg-white block rounded-full relative overflow-hidden">
            <Image
              src={ProfileImage}
              alt="avatar"
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <div className="flex gap-1">
            <span className="font-semibold hover:text-gray-400 cursor-pointer">
              {handle}
            </span>
            <span>•</span>
            <span className="text-gray-400">
              <TimeAgo datetime={metadata?.issue_date || "2023-03-04"} />
            </span>
          </div>
        </div>
        <span className="cursor-pointer hover:text-gray-400 text-lg">
          <BsThreeDots />
        </span>
      </div>

      {/* post body */}
      <div className="w-full h-[400px] md:h-[500px] relative object-contain">
        {metadata?.image && (
          <MediaRenderer
            src={metadata.image}
            alt="post"
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePost;
