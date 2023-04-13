import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
const desiredChainId = ChainId.BinanceSmartChainTestnet;

const client = new ApolloClient({
  uri: "https://api.cyberconnect.dev/testnet/",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider autoConnect={false} activeChain={desiredChainId}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <Toaster />
      </ApolloProvider>
    </ThirdwebProvider>
  );
}
