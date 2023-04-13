import { gql } from "@/Types/__generated__";

export const GET_ESSENECE = gql(`
query getEssences($appID: String!, $handle: String!){
  profileByHandle(handle: $handle){
    essences(appID: $appID) {
      totalCount
      edges {
        node {
          name
          tokenURI
        }
      }
    }
  }
}`);
