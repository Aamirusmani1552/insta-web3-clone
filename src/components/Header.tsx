import React, { useState } from "react";
import InstaLogo from "./InstaLogo";
import ConnectWithCyberConnect from "./ConnectWithCyberConnect";
import { BsInstagram } from "react-icons/bs";

type Props = {};

const Header = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="w-full h-[70px] md:hidden sticky top-0 z-10 bg-white border-b-2  flex items-center justify-between px-[16px]">
      <div className="hidden md:block">
        <InstaLogo />
      </div>
      <div className="sm:block md:hidden text-3xl">
        <BsInstagram />
      </div>
      <ConnectWithCyberConnect setOpen={setOpen} />
    </header>
  );
};

export default Header;
