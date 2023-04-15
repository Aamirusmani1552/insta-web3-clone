import { gql } from "@/Types/__generated__";

export const CREATE_PROFILE_TYPEDATA =
  gql(`mutation CreateProfileTypedData($input: CreateCreateProfileTypedDataInput!){
	createCreateProfileTypedData(input: $input){
    typedDataID
  }
}`);
