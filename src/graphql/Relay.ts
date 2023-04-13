import { gql } from "@/Types/__generated__";

export const RELAY = gql(`
  mutation Relay($input: RelayInput!) {
    relay(input: $input) {
      relayActionId
    }
  }
`);
