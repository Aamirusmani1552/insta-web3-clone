import useGetUserCCProfile from "@/hooks/auth/useGetUserCCProfile";
import useLoginUser from "@/hooks/auth/useLoginUser";
import useAccessToken from "@/hooks/useAccessToken";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConnectWithCyberConnect: React.FC<Props> = ({
  setOpen,
}): React.ReactElement => {
  const switchChain = useSwitchChain();
  const { getUserCCProfile, handle } = useGetUserCCProfile();
  const address = useAddress();
  const { getAccessToken } = useAccessToken();
  const isWrongNetwork = useNetworkMismatch();
  const { loginUser } = useLoginUser();

  console.log(isWrongNetwork);

  useEffect(() => {
    if (!handle.includes(".cyber")) getUserCCProfile();
  }, [address, getUserCCProfile, handle]);

  console.log(handle);

  if (
    address &&
    !handle.includes(".cyber") &&
    !handle.includes("No CC Profile")
  ) {
    return (
      <button
        className="bg-black text-white rounded-md text-base active:bg-gray-600  px-4 py-2 font-semibold"
        onClick={(e) => {
          loginUser();
        }}
      >
        Login
      </button>
    );
  }

  if (address && handle.includes("No CC Profile")) {
    return (
      <button
        className="bg-black text-white rounded-md text-base active:bg-gray-600  px-4 py-2 font-semibold"
        onClick={(e) => {
          setOpen(true);
        }}
      >
        Create Account
      </button>
    );
  }

  if (address && isWrongNetwork) {
    return (
      <button
        className="bg-black text-white px-4 py-2 rounded-md active:bg-gray-800"
        onClick={() => {
          switchChain(ChainId.BinanceSmartChainTestnet);
        }}
      >
        Switch Network
      </button>
    );
  }

  return <ConnectWallet style={{ backgroundColor: "black", color: "white" }} />;
};

export default ConnectWithCyberConnect;
