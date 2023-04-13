import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2";
import { getProvider } from "@/helpers/helpers";
import { toast } from "react-hot-toast";

const useLike = () => {
  async function like(contentId: string) {
    try {
      console.log(contentId);
      if (contentId) {
        alert("please send the content id");
        return;
      }

      const provider = await getProvider();
      const cyberConnect = new CyberConnect({
        namespace: "CyberConnect",
        env: Env.STAGING,
        provider: provider,
        signingMessageEntity: "CyberConnect" || null,
      });

      console.log(cyberConnect);

      await cyberConnect.like(contentId);
      toast.success("Liked!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      throw error;
    }
  }

  return like;
};

export default useLike;
