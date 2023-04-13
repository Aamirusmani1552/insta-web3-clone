import { gql } from "@/Types/__generated__";

export const VERIFY_ESSENCE_METADATA =
  gql(`query VerifyMetaData($metaData: VerifyEssenceMetadataInput!){
    verifyEssenceMetadata(input: $metaData){
      verified
    }
  }`);
