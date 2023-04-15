import { gql } from "@/Types/__generated__";

export const VERIFY_HANDLE = gql(`query VerifyHandle($handle: String!){
    profileHandleEligibility(handle: $handle){
      status
    }
  }`);
