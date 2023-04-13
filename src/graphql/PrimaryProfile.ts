import { gql } from "@/Types/__generated__";

export const PRIMARY_PROFILE = gql(`
  query PrimaryProfile($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        primaryProfile {
          id
          profileID
          handle
          metadata
          avatar
          isPrimary
        }
      }
    }
  }
`);
