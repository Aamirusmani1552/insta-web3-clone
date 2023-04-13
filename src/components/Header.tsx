import React, { Fragment } from "react";
import InstaLogo from "./InstaLogo";
import { IoIosSearch } from "react-icons/io";
import ConnectWithCyberConnect from "./ConnectWithCyberConnect";

import { BsInstagram } from "react-icons/bs";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="w-full h-[70px] md:hidden sticky top-0 z-10 bg-white border-b-2  flex items-center justify-between px-[16px]">
      <div className="hidden md:block">
        <InstaLogo />
      </div>
      <div className="sm:block md:hidden text-3xl">
        <BsInstagram />
      </div>

      <ConnectWithCyberConnect />
    </header>
  );
};

export default Header;
