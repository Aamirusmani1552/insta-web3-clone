import { ACCOUNTS } from "@/graphql/Accounts";
import useGetUserCCProfile from "@/hooks/auth/useGetUserCCProfile";
import useLoginUser from "@/hooks/auth/useLoginUser";
import { useQuery } from "@apollo/client";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

type Props = {};

const ConnectWithCyberConnect: React.FC<Props> = ({}): React.ReactElement => {
  const switchChain = useSwitchChain();
  const { getUserCCProfile } = useGetUserCCProfile();
  const address = useAddress();
  const isWrongNetwork = useNetworkMismatch();

  useEffect(() => {
    getUserCCProfile();
  }, [address, getUserCCProfile]);

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
