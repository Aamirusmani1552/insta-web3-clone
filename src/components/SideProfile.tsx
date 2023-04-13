import { MediaRenderer, useAddress } from "@thirdweb-dev/react";
import React from "react";
import ConnectButton from "./ConnectWithCyberConnect";

type Props = {};

function SideProfile({}: Props) {
  const address = useAddress();

  return (
    <>
      {address && (
        <section className="text-sm h-fit hidden items-center justify-between flex-1 mt-4 xl:flex">
          <div className="flex items-center gap-4">
            {/* profile photo */}
            <div className="rounded-full overflow-hidden">
              <MediaRenderer
                src={""}
                alt={"side_profile"}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: "2px solid gray",
                }}
              />
            </div>

            {/* name */}
            <div className="flex flex-col">
              <span className="font-semibold"></span>
              <span className="text-gray-500">
                {address
                  ? address?.slice(0, 5) + "..." + address?.slice(-4)
                  : "0x00..00"}
              </span>
            </div>
          </div>

          {/* switch */}
          <div>
            <span className="font-semibold cursor-pointer text-[#0698F7]">
              switch
            </span>
          </div>
        </section>
      )}
    </>
  );
}

export default SideProfile;
