import { LOGIN_GET_MESSAGE } from "@/graphql/loginGetMessage";
import { LOGIN_VERIFY } from "@/graphql/loginVerifty";
import { setAccessToken, getEthereumSigner } from "@/helpers/helpers";
import { useMutation } from "@apollo/client";

import { useAddress } from "@thirdweb-dev/react";
import useLocalStorage from "../useLocalStorage";

const useLoginUser = () => {
  const address = useAddress();
  const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE);
  const [loginVerify] = useMutation(LOGIN_VERIFY);
  const { getUser } = useLocalStorage();

  async function loginUser() {
    // Get the signers
    if (!address) {
      return;
    }

    const userInfo = getUser();

    if (!userInfo) {
      return;
    }

    const { handle, profileId } = userInfo;

    try {
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
      setAccessToken(accessToken);
    } catch (error) {
      throw error;
    }
  }
  return { loginUser };
};

export default useLoginUser;
