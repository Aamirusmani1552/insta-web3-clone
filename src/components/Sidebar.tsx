import React, { useState, useEffect } from "react";
import InstaLogo from "./InstaLogo";
import {
  CreatePostIcon,
  ExploreIcon,
  HomeIcon,
  InstaSmallLogo,
  LikeIcon,
  MessageIcon,
  ReelsIcon,
  SearchIcon,
} from "./ImportantIcons";

import { CgProfile } from "react-icons/cg";

import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";
import useGetUserCCProfile from "@/hooks/auth/useGetUserCCProfile";

type Props = {};

function Sidebar({}: Props) {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handle, profileId, getUserCCProfile } = useGetUserCCProfile();

  useEffect(() => {
    if(!address || handle.includes("No CC Profile")) return;
    getUserCCProfile();
  }, [address, handle, profileId, getUserCCProfile]);

  const styles = {
    listItemStyle:
      "flex gap-4 text-[16px] p-[12px] my-[2px] hover:bg-[rgb(250,250,250)] cursor-pointer rounded-full",
    mainSidebarStyles:
      "w-[72px] lg:w-[244px] hidden h-screen md:flex flex-col px-3 pt-[12px] pb-[20px] border-r-[1px] border-gray-300 sticky top-0 left-0",
    instaLargeLogoStyles:
      "pt-[25px] pb-[16px] pl-[12px] pr-[12px] mb-[19px] hidden lg:block cursor-pointer",
    instaSmallLogoStyles:
      "pt-[25px] pb-[16px] pl-[12px] pr-[12px] mb-[19px] block lg:hidden cursor-pointer",
    textStyles: "hidden lg:block",
  };
  return (
    <div className={styles.mainSidebarStyles}>
      <div className={styles.instaLargeLogoStyles}>
        <InstaLogo />
      </div>
      <div className={styles.instaSmallLogoStyles}>
        <InstaSmallLogo />
      </div>
      <nav>
        <ul className="flex flex-col">
          <li>
            <Link href={"/"} className={styles.listItemStyle}>
              <HomeIcon />
              <span className={styles.textStyles}>Home</span>
            </Link>
          </li>
          <li className={styles.listItemStyle}>
            <SearchIcon />
            <span className={styles.textStyles}>Search</span>
          </li>
          <li className={styles.listItemStyle}>
            <ExploreIcon />
            <span className={styles.textStyles}>Explore</span>
          </li>
          <li className={styles.listItemStyle}>
            <ReelsIcon />
            <span className={styles.textStyles}>Reels</span>
          </li>
          <li className={styles.listItemStyle}>
            <MessageIcon />
            <span className={styles.textStyles}>Messages</span>
          </li>
          <Link href={`/notifications/`}>
            <li className={styles.listItemStyle}>
              <LikeIcon />
              <span className={styles.textStyles}>Notifications</span>
            </li>
          </Link>
          <li>
            <Link href={"/create"} className={styles.listItemStyle}>
              <CreatePostIcon />
              <span className={styles.textStyles}>Create</span>
            </Link>
          </li>
          {address && (
            <li className={styles.listItemStyle}>
              <div className={"text-2xl"}>
                <CgProfile />
              </div>
              <span className={styles.textStyles}>
                {/* {address?.slice(0, 4) + "..." + address?.slice(-4)} */}
                {handle}
              </span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
