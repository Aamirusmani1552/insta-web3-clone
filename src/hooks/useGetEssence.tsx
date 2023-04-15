import { useAddress } from "@thirdweb-dev/react";
import useLocalStorage from "./useLocalStorage";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { EssencesByFilterQuery } from "@/Types/__generated__/graphql";
import { ethers } from "ethers";
import { ESSENCES_BY_FILTER } from "@/graphql/EssenceByFilter";

const useGetEssence = () => {
  const address = useAddress();
  const { getUser } = useLocalStorage();
  const { data, loading } = useQuery(ESSENCES_BY_FILTER, {
    variables: {
      me: address ? address : ethers.constants.AddressZero,
      appID: "example_app_Id",
    },
  });
  const [essences, setEssences] = useState<EssencesByFilterQuery | null>();

  const getEssence = () => {

    if (!data) {
      setEssences(null);
      return;
    }

    setEssences(data);
  };

  return { getEssence, essences, setEssences };
};

export default useGetEssence;
