import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import BottomNavBar from "../components/BottomNavBar";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ConnectWithCyberConnect from "@/components/ConnectWithCyberConnect";
import { GET_COLLECTED_ESSENCE } from "@/graphql/GetCollectedEssence";
import { useQuery } from "@apollo/client";
import ProfilePost from "@/components/ProfilePost";
import useGetUserCCProfile from "@/hooks/auth/useGetUserCCProfile";

type Props = {};

const Collected = (props: Props) => {
  const address = useAddress();
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useQuery(GET_COLLECTED_ESSENCE, {
    variables: {
      address
    }
  });
  const { getUserCCProfile, handle } = useGetUserCCProfile();

  console.log(data)

  React.useEffect(() => {
    getUserCCProfile()
  }, [handle,getUserCCProfile])


  return <main className={""}>
    <Header />
    <div className="flex">
      <Sidebar />


      <div className="w-full flex min-h-full  px-0 md:px-20 flex-1 md:w-400px">
        <div className=" w-full   px-2 md:px-0 pb-12">
          <div className="py-4 md:flex items-center justify-end hidden ">
            <ConnectWithCyberConnect setOpen={setOpen} />
          </div>
          {/* posts will come here */}
          <div className="flex items-center justify-between max-w-[500px] mb-8 py-4">
            <h1 className="text-xl md:text-2xl font-semibold  ">
              Collected
            </h1>

          </div>
          {address ?
            <div>
              {!data ? <div className="w-full h-[200px] max-w-[500px] flex items-center justify-center ">
                <div className="w-8 h-8 border-4 border-b-transparent rounded-full animate-spin"></div>
              </div>
                : data?.address?.wallet?.collectedEssences.edges && data.address.wallet.collectedEssences.edges.length > 0 ? (
                  data?.address?.wallet?.collectedEssences.edges.map((e, k) => {
                    return (
                      <ProfilePost key={k} data={e?.node!} handle={handle as string} />
                    );
                  })
                ) : (
                  <div className="w-full  max-w-[500px] flex items-center justify-center ">
                    <div className="px-4 py-2 rounded-md shadow-md ">Nothing to show here</div>
                  </div>
                )}
            </div>
            :
            <div className="px-4 py-2 rounded-md shadow-md w-fit">Please connect you wallet first</div>
          }
        </div>
      </div>
    </div>
    <BottomNavBar />
  </main>;
};

export default Collected;
