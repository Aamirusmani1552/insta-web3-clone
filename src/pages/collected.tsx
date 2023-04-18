import { useAddress } from "@thirdweb-dev/react";
import React from "react";

type Props = {};

const Collected = (props: Props) => {
  const address = useAddress();

  if (!address) {
    return (
      <div className="px-4 py-2 w-fit rounded-md text-sm shadow-md">
        Please connect to wallet
      </div>
    );
  }
  return <div>collected</div>;
};

export default Collected;
