import { EssenceMetadata } from "@/Types/__generated__/graphql";
import { v4 as uuidv4 } from "uuid";
import { useAddress, useStorageUpload } from "@thirdweb-dev/react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_REGISTER_ESSENCE_TYPED_DATA } from "@/graphql/CreateSubscribeTypedData.ts";
import { RELAY_ACTION_STATUS } from "../graphql/RelayActionStatus";
import { getEthereumSigner, parseIPFSUrl } from "@/helpers/helpers";
import { RELAY } from "@/graphql/Relay";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useLocalStorage from "./useLocalStorage";
import useAccessToken from "./useAccessToken";

type FunctionProps = {
  nftFile: File | undefined;
  title: string;
  description: string;
  vedio_ipfs_uri?: string;
};

const useCreateEssence = () => {
  const { getUser } = useLocalStorage();
  const address = useAddress();
  const [status, setStatus] = useState<string>("Create");
  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  const { getAccessToken } = useAccessToken();
  const token = getAccessToken();
  const appId = "example_app_Id";

  const [createTypedData] = useMutation(CREATE_REGISTER_ESSENCE_TYPED_DATA, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

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

      const token = getAccessToken();

      if (!token) {
        alert("you are not signed in");
        return;
      }

      if (!userInfo || token.length === 0) {
        alert("No user token available Please login.");
        return;
      }

      const { nftFile, description, title, vedio_ipfs_uri } = props;

      setStatus("Uploading");
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
        app_id: appId,
        lang: "en",
        issue_date: new Date().toISOString().slice(0, 10),
        content: "",
        media: [],
        tags: [],
        image: parseIPFSUrl(nftFileURI),
        name: title.length > 0 ? title : "",
        description: description.length > 0 ? description : "",
        attributes: [],
      };

      if (vedio_ipfs_uri && vedio_ipfs_uri.length > 0) {
        metadata.animation_url =
          "https://gateway.ipfscdn.io/ipfs/" + vedio_ipfs_uri;
      }

      const metadataURI = await storage.upload(metadata);
      console.log(metadataURI);

      setStatus("Waiting For approval");

      // CREATING TYPED METADATA FOR USER SIGNATURE
      const typedDataResult = await createTypedData({
        variables: {
          input: {
            profileID: userInfo.profileId,
            name: "post",
            symbol: "POST",
            tokenURI: parseIPFSUrl(metadataURI),
            transferable: true,
            middleware: {
              collectFree: true,
            },
            deployAtRegister: true,
          },
        },
      });

      setStatus("Creating Post");
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
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setStatus("Create");
    }
  }

  return { createEssence, status };
};

export default useCreateEssence;
