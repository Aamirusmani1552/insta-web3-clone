import { useLazyQuery, useMutation } from "@apollo/client";
import { useAddress, useStorageUpload } from "@thirdweb-dev/react";
import useLocalStorage from "../useLocalStorage";
import { getEthereumSigner } from "@/helpers/helpers";
import { toast } from "react-hot-toast";
import useAccessToken from "../useAccessToken";
import { CREATE_PROFILE_TYPEDATA } from "@/graphql/CreateCreateProfileTypedData";
import { LOGIN_GET_MESSAGE } from "@/graphql/loginGetMessage";
import { LOGIN_VERIFY } from "@/graphql/loginVerifty";

type CreateProfileInput = {
  to: string; //owner of CC profile
  handle: string;
  avatar: string;
  metadata: string;
  operator: string;
};

const useCreateCCProfile = () => {
  let address = useAddress();
  const { getUser, setUser } = useLocalStorage();
  const { getAccessToken } = useAccessToken();
  const token = getAccessToken();
  const signer = getEthereumSigner();
  const [getLoginMessage] = useMutation(LOGIN_GET_MESSAGE);
  const [loginVerify] = useMutation(LOGIN_VERIFY);

  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  // const [checkHandle, { data }] = useLazyQuery(VERIFY_HANDLE, {});
  const [createTypedData, { data }] = useMutation(CREATE_PROFILE_TYPEDATA, {});

  const createCCProfile = async (
    handle: string,
    image: File,
    description = "Hey there"
  ) => {
    let token = getAccessToken();
    try {
      if (!address) {
        toast("⚠ Please Connect Your Wallet");
        return;
      }

      if (handle.length === 0) {
        toast("⚠ Please enter a handle");
        return;
      }

      if (!image) {
        toast("⚠ Please upload an image");
        return;
      }

      const ImageUploadResult = await uploadToIpfs({ data: [image] });
      if (!ImageUploadResult || ImageUploadResult.length === 0) {
        throw new Error("Could not upload Image");
      }

      const ipfsHash = ImageUploadResult[0];

      const profileMetadata = {
        description: description,
        image: ipfsHash,
        name: handle,
        createdAt: new Date().getTime(),
        attributes: [
          {
            trait_type: "InstaWeb3Profile",
            value: "Gold Profile",
          },
        ],
      };

      const uploadMetaDataResult = await uploadToIpfs({
        data: [profileMetadata],
      });

      if (uploadMetaDataResult.length === 0 || !uploadMetaDataResult) {
        throw new Error("Failed to upload metadata");
      }

      const metaIpfshash = uploadMetaDataResult[0];

      const metadataInput: CreateProfileInput = {
        to: address,
        handle: handle,
        avatar: ipfsHash,
        metadata: metaIpfshash,
        operator: "0x",
      };

      const messageResult = await getLoginMessage({
        variables: {
          input: {
            address: address,
            domain: "cyberconnect.me",
          },
        },
      });

      //get message from result
      const message = messageResult?.data?.loginGetMessage?.message;

      const signature = await (await signer).signMessage(message);

      console.log("i am here now");
      const accessTokenResult = await loginVerify({
        variables: {
          address: address,
          domain: "cyberconnect.me",
          signature,
        },
      });

      console.log("i am here");
      console.log(accessTokenResult.data?.loginVerify.accessToken);

      const typedDataResult = await createTypedData({
        variables: {
          input: metadataInput,
        },
        context: {
          headers: {
            Authorization: `Bearer ${accessTokenResult.data?.loginVerify.accessToken}`,
          },
        },
      });
      console.log("now here");

      console.log(typedDataResult);

      console.log(accessTokenResult);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      return;
    }
  };

  return { createCCProfile };
};

export default useCreateCCProfile;
