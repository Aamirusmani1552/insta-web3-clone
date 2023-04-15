import { useLazyQuery, useMutation } from "@apollo/client";
import { useAddress, useStorageUpload } from "@thirdweb-dev/react";
import useLocalStorage from "../useLocalStorage";
import { useState } from "react";
import { VERIFY_HANDLE } from "@/graphql/VerifyHandle";
import { toast } from "react-hot-toast";
import useAccessToken from "../useAccessToken";
import { CREATE_PROFILE_TYPEDATA } from "@/graphql/CreateCreateProfileTypedData";

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

  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  // const [checkHandle, { data }] = useLazyQuery(VERIFY_HANDLE, {});
  const [createTypedData, { data }] = useMutation(CREATE_PROFILE_TYPEDATA, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const createCCProfile = async (
    handle: string,
    image: File,
    description = "Hey there"
  ) => {
    let token = getAccessToken();
    console.log(token);
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
        operator: "",
      };

      const typedDataResult = await createTypedData({
        variables: {
          input: metadataInput,
        },
      });

      console.log(typedDataResult);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      return;
    }
  };

  return { createCCProfile };
};

export default useCreateCCProfile;
