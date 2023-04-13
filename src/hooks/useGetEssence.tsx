import { useAddress } from "@thirdweb-dev/react";
import useLocalStorage from "./useLocalStorage";
import { useQuery } from "@apollo/client";
import { ESSENCES_BY_FILTER } from "@/graphql/EssenceByFilter";

const useGetEssence = () => {
  const address = useAddress();
  const { getUser } = useLocalStorage();
  const { data, loading } = useQuery(ESSENCES_BY_FILTER, {
    variables: {
      me: address,
      appID: "example_1552",
    },
  });

  const getEssence = () => {
    if (!address) return;

    const user = getUser();

    if (!user) return;

    console.log(data);
  };

  return { getEssence };
};

export default useGetEssence;
