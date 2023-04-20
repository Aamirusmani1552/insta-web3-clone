import { useAddress } from "@thirdweb-dev/react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { RELAY_ACTION_STATUS } from "../graphql/RelayActionStatus";
import {
  getEthereumSigner,
  parseIPFSUrl,
} from "@/helpers/helpers";
import { RELAY } from "@/graphql/Relay";
import { CREATE_SUBSCRIBE_TYPED_DATA } from "@/graphql/CreateSubscribeTypedata";
import { toast } from "react-hot-toast";
import useLocalStorage from "./useLocalStorage";

const useSubscribeProfile = () => {
  const address = useAddress();
  const {getAccessToken,getUser} = useLocalStorage();
  const token = getAccessToken();

  const [createTypedData, { data, loading, error }] = useMutation(
    CREATE_SUBSCRIBE_TYPED_DATA,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      },
    }
  );

  const [relay] = useMutation(RELAY, {
    context: {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        "X-API-KEY": process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY,
      },
    },
  });

  const [relayActionStatus] = useLazyQuery(RELAY_ACTION_STATUS);

  const userInfo = getUser();

  async function subscribeProfile(profileId: number) {
    try {
      // if no address, return
      if (!address) {
        toast("⚠ Please connect you wallet first");
        return;
      }

      if (!userInfo || !token) {
        toast("⚠ No user token available Please login.");
        return;
      }

      // GET SIGNER FOR SIGNING MESSAGE
      const signer = await getEthereumSigner();

      // CREATING TYPED METADATA FOR USER SIGNATURE
      const typedDataResult = await createTypedData({
        variables: {
          input: {
            profileIDs: [profileId],
          },
        },
      });

      const typedData =
        typedDataResult.data?.createSubscribeTypedData.typedData;
      const message = typedData?.data;
      const typedDataID = typedData?.id;

      if (!typedDataID) {
        return;
      }
      // SINGNING MESSAGE
      const params = [address, message];
      const method = "eth_signTypedData_v4";
      const signature = await signer.provider.send(method, params);

      const relayResult = await relay({
        variables: {
          input: {
            typedDataID: typedDataID,
            signature: signature,
          },
        },
      });

      const relayActionId = relayResult.data?.relay.relayActionId;

      if (!relayActionId) {
        throw new Error("Relay Error");
      }

      // checking relay status
      const relayActionResult = await relayActionStatus({
        variables: {
          relayActionId,
        },
      });

      console.log(relayActionResult);
      toast.success("Successfully subscribed!");
    } catch (error) {
      console.log(error);
      const err = error as Error;
      toast.error(err.message);
    }
  }

  return {subscribeProfile};
};

export default useSubscribeProfile;
