import { ACCOUNTS } from "@/graphql/Accounts";
import { useQuery } from "@apollo/client";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import useLocalStorage from "../useLocalStorage";
import { useState } from "react";

const useGetUserCCProfile = () => {
  let address = useAddress();
  const { getUser, setUser } = useLocalStorage();
  const [handle, setHandle] = useState<string>("User_Handle");
  const [profileId, setProfileId] = useState<number>();

  const { data } = useQuery(ACCOUNTS, {
    variables: { address: address ? address : ethers.constants.AddressZero },
  });

  const getUserCCProfile = () => {
    if (!address) return;
    if (!data) return;
    console.log(data);

    const handle = data?.address?.wallet?.profiles.edges?.[0]?.node?.handle;
    const profileId =
      data?.address?.wallet?.profiles.edges?.[0]?.node?.profileID;

    if (!handle || !profileId) {
      setHandle("No CC Profile");
      return;
    }

    //checking if the user in localstorage is same as we get after making query
    let userInLocalStorage = getUser();
    if (userInLocalStorage) {
      if (
        userInLocalStorage.handle == handle &&
        userInLocalStorage.profileId == profileId
      ) {
        setHandle(userInLocalStorage.handle);
        setProfileId(userInLocalStorage.profileId);
        return;
      }
    }

    setUser({
      handle,
      profileId,
    });

    setHandle(handle);
    setProfileId(profileId);
  };

  return { getUserCCProfile, handle, profileId };
};

export default useGetUserCCProfile;
