import { gql } from "@/Types/__generated__";

export const CREATE_SUBSCRIBE_TYPED_DATA = gql(`
  mutation CreateSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {
    createSubscribeTypedData(input: $input) {
      typedData {
        id
        sender
        data
        nonce
      }
    }
  }
`);
