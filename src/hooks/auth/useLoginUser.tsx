import { LOGIN_GET_MESSAGE } from "@/graphql/loginGetMessage";
import { LOGIN_VERIFY } from "@/graphql/loginVerifty";
import { getEthereumSigner } from "@/helpers/helpers";
import { useMutation } from "@apollo/client";

import { useAddress } from "@thirdweb-dev/react";
import useLocalStorage from "../useLocalStorage";
import { useEffect, useState } from "react";
import useGetUserCCProfile from "./useGetUserCCProfile";

const useLoginUser = () => {
  const address = useAddress();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE);
  const [loginVerify] = useMutation(LOGIN_VERIFY);
  const {getUserCCProfile,handle:profileHandle} = useGetUserCCProfile();
  const { getUser, getAccessToken, setAccessToken } = useLocalStorage();
  const userInfo = getUser();
  const tokenData = getAccessToken();


  useEffect(()=>{
    getUserCCProfile();
  },[profileHandle,getUserCCProfile])

  async function loginUser() {
    // Get the signers
    if (!address) {
      return;
    }

    if (!userInfo) {
      return;
    }


    const { handle, profileId } = userInfo;

    try {
      if (tokenData && profileHandle == handle) {
        setIsLoggedIn(true);
        return;
      }

      //get signer
      const signer = await getEthereumSigner();

      //get login message
      const messageResult = await loginGetMessage({
        variables: {
          input: {
            address: address,
            domain: handle,
          },
        },
      });

      //get message from result
      const message = messageResult?.data?.loginGetMessage?.message;

      // sign the message
      const signature = await signer.signMessage(message);

      //verfiy the signature
      const accessTokenResult = await loginVerify({
        variables: {
          address: address,
          domain: handle,
          signature,
        },
      });

      const accessToken = accessTokenResult?.data?.loginVerify?.accessToken;

      if (!accessToken) {
        throw new Error("An error occured during login");
      }

      setIsLoggedIn(true);
      setAccessToken({ accessToken: accessToken, generatedAt: new Date() });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  function checkUserValid(){
    if (tokenData && profileHandle == userInfo?.handle) {
      setIsLoggedIn(true);
      return;
    }
    setIsLoggedIn(false)
  }
  return { loginUser, isLoggedIn,checkUserValid };
};

export default useLoginUser;
