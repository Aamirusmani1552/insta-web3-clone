import React, { useEffect, useState } from "react";
import ConnectWithCyberConnect from "./ConnectWithCyberConnect";
import useGetEssence from "@/hooks/useGetEssence";
import { useAddress } from "@thirdweb-dev/react";
import Post from "./Post";

type Props = {};

function MainContent({}: Props) {
  const { getEssence, essences } = useGetEssence();
  const address = useAddress();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    getEssence();
  }, [getEssence, address]);

  return (
    <div className="w-full flex min-h-full  px-0 md:px-20 flex-1 md:w-400px">
      <div className=" w-full   px-2 md:px-0 pb-12">
        <div className="py-4 md:flex items-center justify-end hidden ">
          <ConnectWithCyberConnect setOpen={setOpen} />
        </div>
        {/* posts will come here */}

        <div className="flex flex-col-reverse">
          {essences ? (
            essences.essencesBy.edges?.map((e, k) => {
              return <Post key={k} data={e} />;
            })
          ) : (
            <div className="w-full h-[200px] max-w-[500px] flex items-center justify-center ">
              <div className="w-8 h-8 border-4 border-b-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
      {/* <SideProfile /> */}
    </div>
  );
}

export default MainContent;
