import { gql } from "@/Types/__generated__";

export const GET_COLLECTED_ESSENCE = gql(`
query getCollectedEssencesByAddressEVM($address: AddressEVM!){
      address(address: $address) {
        wallet {
          collectedEssences(first: 4){
            edges {
                node {
                    essence{
                      name
                      tokenURI
                    }
                }
            }
            }
          }
        }
      }
    
`);
