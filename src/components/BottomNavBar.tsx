import React,{useEffect} from "react";

import {
  HomeIcon,
  SearchIcon,
  CreatePostIcon,
} from "./ImportantIcons";
import Link from "next/link";
import { BsFillCollectionFill } from "react-icons/bs";
import useGetUserCCProfile from "@/hooks/auth/useGetUserCCProfile";

type Props = {};

function BottomNavBar({ }: Props) {
  const styles = {
    mainContainer:
      " block md:hidden border-t-[1px] border-gray-200 fixed bg-white w-full bottom-0",
    ulStyles: "flex items-center justify-around",
    itemStyles: "p-3 mr-2",
    profile: "w-6 h-6 bg-black rounded-full overflow-hidden",
  };
  
  const {getUserCCProfile,handle} = useGetUserCCProfile();
  
  useEffect(()=>{
    getUserCCProfile();
  },[handle])

  return (
    <nav className={styles.mainContainer}>
      <ul className={styles.ulStyles}>
        <li className={styles.itemStyles}>
          <Link href={"/"}>
            <HomeIcon />
          </Link>
        </li>
        <li className={styles.itemStyles}>
          <SearchIcon />
        </li>
        <li className={styles.itemStyles}>
          <Link href={"/create"}>
            <CreatePostIcon />
          </Link>
        </li>
        <li
          className={"p-3 mr-2 text-2xl"}
        >
          <Link
            href={`/collected`}
          >
              <BsFillCollectionFill />
          </Link>
        </li>
        <li
          className={"p-3 mr-2 text-2xl"}
        >
          <Link
            href={`/profile/${handle}`}
          >
          <div className={styles.profile}>
          </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavBar;
