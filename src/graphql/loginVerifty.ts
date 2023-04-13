import { gql } from "@/Types/__generated__";

export const LOGIN_VERIFY =
  gql(`mutation loginVerify ($domain:String!,$address:AddressEVM!,$signature:String!) 
{
  loginVerify(input:{
    domain:$domain,
    address:$address,
    signature:$signature
  }){
    accessToken
  }
}`);
