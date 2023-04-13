import { useAsset, useCreateAsset, useUpdateAsset } from "@livepeer/react";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

type Props = {
  video: File;
};

const useLivePeer = ({ video }: Props) => {
  const address = useAddress();
  const [timer, setTimer] = useState<Boolean>(true);
  const [cid, setCid] = useState<string>("");
  const [isIPFS, setIsIPFS] = useState<boolean>(false);

  const {
    mutateAsync: createAsset,
    data: asset,
    status: uploadStatus,
    progress: uploadProgress,
    error: uploadError,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null
  );

  const {
    mutateAsync: updateAsset,
    status: updateStatus,
    error: updateError,
    data: updatedAsset,
  } = useUpdateAsset({
    assetId: asset?.[0].id!,
    storage: { ipfs: true },
  });

  const { data: refetchedAsset } = useAsset({
    assetId: updatedAsset?.id,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (uploadProgress?.[0].phase === "ready") {
      console.log("updating");
      handleUpdate();
    }
  }, [uploadProgress]);

  console.log("This is the cid", cid);

  useEffect(() => {
    if (!refetchedAsset?.storage?.ipfs?.cid) return;
    setCid(refetchedAsset.storage.ipfs.cid);
  }, [refetchedAsset]);

  async function handleUpdate() {
    await updateAsset();
  }

  async function uploadVideo() {
    try {
      if (!address) {
        alert("please connect wallet");
        return;
      }

      if (!video) {
        alert("You didn't provide the video");
        return;
      }

      //uploading to LivePeer
      await createAsset();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return {
    uploadVideo,
    uploadProgress,
    uploadError,
    uploadStatus,
    updateStatus,
    updateError,
    updatedAsset,
    cid,
  };
};

export default useLivePeer;
