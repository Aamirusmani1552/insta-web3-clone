import { MediaRenderer } from "@thirdweb-dev/react";
import React from "react";

import {
  ExploreIcon,
  HomeIcon,
  MessageIcon,
  ReelsIcon,
  SearchIcon,
} from "./ImportantIcons";

type Props = {};

function BottomNavBar({}: Props) {
  const styles = {
    mainContainer:
      " block md:hidden border-t-[1px] border-gray-200 fixed bg-white w-full bottom-0",
    ulStyles: "flex items-center justify-around",
    itemStyles: "p-3 mr-2",
    profile: "w-6 h-6 bg-black rounded-full overflow-hidden",
  };

  return (
    <nav className={styles.mainContainer}>
      <ul className={styles.ulStyles}>
        <li className={styles.itemStyles}>
          <HomeIcon />
        </li>
        <li className={styles.itemStyles}>
          <SearchIcon />
        </li>
        <li className={styles.itemStyles}>
          <ExploreIcon />
        </li>
        <li className={styles.itemStyles}>
          <ReelsIcon />
        </li>
        <li className={styles.itemStyles}>
          <MessageIcon />
        </li>
        <li className={styles.itemStyles}>
          <div className={styles.profile}>
            {/* <MediaRenderer
              src={
                // @ts-ignore
                profileQuery?.data?.defaultProfile?.coverPicture?.original
                  .url || lensProfile.src
              }
              alt={"profile"}
              style={{
                width: 24,
                height: 24,
              }}
            /> */}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavBar;
