import { gql } from "@/Types/__generated__";

export const PROFILE_BY_HANDLE = gql(`query getProfileByHandle($handle: String!){
    profileByHandle(handle: $handle) {
      metadataInfo {
        avatar
        bio
      }
      owner {
        address
      }
      isPrimary
      profileID
    }
  }`)