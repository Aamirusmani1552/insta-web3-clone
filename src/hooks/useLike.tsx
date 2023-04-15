import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2";
import { getProvider } from "@/helpers/helpers";
import { toast } from "react-hot-toast";
import { useAddress } from "@thirdweb-dev/react";
import useGetUserCCProfile from "./auth/useGetUserCCProfile";
import { useEffect } from "react";

const useLike = () => {
  const address = useAddress();
  const {handle, getUserCCProfile} = useGetUserCCProfile();

  useEffect(()=>{
    if(!address){
      return;
    }
    getUserCCProfile();
  },[address, getUserCCProfile])

  async function like(contentId: string) {
    try {
      if (!address) {
        toast("⚠ Connect to Wallet first");
        return;
      }


      if(!handle.includes(".cyber")){
        toast.error("You are not logged in");
        return;
      }

      if (contentId.length == 0) {
        alert("please send the content id");
        return;
      }

      const provider = await getProvider();
      const cyberConnect = new CyberConnect({
        namespace: "CyberConnect",
        env: Env.STAGING,
        provider: provider,
        signingMessageEntity: "CyberConnect" || null,
        appId: "example_app_Id",
      });

      await cyberConnect.like(contentId);
      toast.success("Liked!");
      return true;
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      return false;
    }
  }

  return { like };
};

export default useLike;
