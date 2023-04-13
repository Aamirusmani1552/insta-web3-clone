import { EssenceMetadata } from "@/Types/__generated__/graphql";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAddress, useStorageUpload } from "@thirdweb-dev/react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_REGISTER_ESSENCE_TYPED_DATA } from "@/graphql/CreateSubscribeTypedData.ts";
import { RELAY_ACTION_STATUS } from "../graphql/RelayActionStatus";
import {
  getAccessToken,
  getEthereumSigner,
  getUser,
  parseIPFSUrl,
} from "@/helpers/helpers";
import { RELAY } from "@/graphql/Relay";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { ethers } from "ethers";
import { CREATE_COLLECT_ESSENCE_TYPED_DATA } from "@/graphql/CreateCollectEssenceTypedata";
import useCollectEssence from "./useCollectEssence";

import { toast } from "react-hot-toast";

type FunctionProps = {
  nftFile: File | undefined;
  title: string;
  description: string;
  content: string;
  paid: boolean;
  amount?: number;
  collectSupply?: number;
  appID: string;
  vedio_ipfs_uri: string;
};

const useCreateEssence = () => {
  const [status, setStatus] = useState();
  const address = useAddress();
  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  const token = getAccessToken();
  const collectEssence = useCollectEssence();

  const [createTypedData, { data, loading, error }] = useMutation(
    CREATE_REGISTER_ESSENCE_TYPED_DATA,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const [relay] = useMutation(RELAY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY,
      },
    },
  });

  const [relayActionStatus] = useLazyQuery(RELAY_ACTION_STATUS);

  const storage = new ThirdwebStorage();

  const userInfo = getUser();
  let nftFileURI = "";

  async function createEssence(props: FunctionProps) {
    try {
      // if no address, return
      if (!address) {
        alert("Please connect you wallet first");
        return;
      }

      if (!userInfo || token.length === 0) {
        alert("No user token available Please login.");
        return;
      }

      const {
        nftFile,
        content,
        description,
        title,
        amount,
        paid,
        collectSupply,
        appID,
        vedio_ipfs_uri,
      } = props;

      // STORING FILE IN IPFS
      nftFileURI = (await uploadToIpfs({ data: [nftFile] }))[0];

      console.log(nftFileURI);

      // GET SIGNER FOR SIGNING MESSAGE
      const signer = await getEthereumSigner();

      const essenceID = uuidv4();
      // CREATING METADATA FOR NFT
      const metadata: EssenceMetadata = {
        metadata_id: essenceID,
        version: "1.0.0",
        app_id: appID,
        lang: "en",
        issue_date: new Date().toISOString().slice(0, 10),
        content: content.length > 0 ? content : "",
        media: [],
        tags: [],
        image: parseIPFSUrl(nftFileURI),
        name: title.length > 0 ? title : "",
        description: description.length > 0 ? description : "",
        attributes: [],
      };

      if (vedio_ipfs_uri.length > 0) {
        metadata.animation_url =
          "https://gateway.ipfscdn.io/ipfs/" + vedio_ipfs_uri;
      }

      console.log(JSON.stringify(metadata));

      const metadataURI = await storage.upload(metadata);
      console.log(metadataURI);

      // CREATING TYPED METADATA FOR USER SIGNATURE
      const typedDataResult = await createTypedData({
        variables: {
          input: {
            profileID: userInfo.profileId,
            name: "post",
            symbol: "POST",
            tokenURI: parseIPFSUrl(metadataURI),
            transferable: true,
            middleware:
              paid === false
                ? { collectFree: true }
                : {
                    collectPaid: {
                      /* Address that will receive the amount */
                      recipient: address,
                      /* Number of times the Essence can be collected */
                      totalSupply: collectSupply
                        ? collectSupply.toString()
                        : "1000",
                      /* Amount that needs to be paid to collect essence */
                      amount: amount
                        ? ethers.utils.parseEther(amount.toString()).toString()
                        : "1000000000000000000",
                      /* The currency for the  amount. BUSD Token contract on BNB Testnet */
                      currency: "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
                      /* If it require that the collector is also subscribed */
                      subscribeRequired: false,
                    },
                  },
            deployAtRegister: true,
          },
        },
      });
      const typedData =
        typedDataResult.data?.createRegisterEssenceTypedData.typedData;
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
      console.log(relayActionId);

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
      toast.success("Successfully Created!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return createEssence;
};

export default useCreateEssence;
