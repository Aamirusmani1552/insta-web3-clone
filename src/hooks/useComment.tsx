import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2";
import { getProvider } from "@/helpers/helpers";
import { toast } from "react-hot-toast";
import { useAddress } from "@thirdweb-dev/react";

interface Content {
  title: string;
  body: string;
  author: string; // The ccProfile handle of the author
}

const useComment = () => {
  const address = useAddress();

  async function comment(contentId: string, content: Content) {
    try {
      console.log(contentId, content);
      if (!address) {
        toast("⚠ Connect to Wallet first");
        return;
      }
      if (contentId.length == 0) {
        toast("please send the content id");
        return;
      }

      if (!content) {
        toast("Not all details provided");
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

      await cyberConnect.createComment(contentId, content);
      toast.success("Comment sent");
      return true;
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      return false;
    }
  }

  return { comment };
};

export default useComment;
