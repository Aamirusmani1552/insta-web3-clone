/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query Accounts($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        profiles {\n          totalCount\n          edges {\n            node {\n              id\n              profileID\n              handle\n              metadata\n              avatar\n              isPrimary\n            }\n          }\n        }\n      }\n    }\n  }": types.AccountsDocument,
    "\n  mutation CreateCollectEssenceTypedData(\n    $input: CreateCollectEssenceTypedDataInput!\n  ) {\n    createCollectEssenceTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n": types.CreateCollectEssenceTypedDataDocument,
    "\n  mutation CreateRegisterEssenceTypedData(\n    $input: CreateRegisterEssenceTypedDataInput!\n  ) {\n    createRegisterEssenceTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n": types.CreateRegisterEssenceTypedDataDocument,
    "\n  mutation CreateSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {\n    createSubscribeTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n": types.CreateSubscribeTypedDataDocument,
    "\nquery getEssences($appID: String!, $handle: String!){\n  profileByHandle(handle: $handle){\n    essences(appID: $appID) {\n      totalCount\n      edges {\n        node {\n          name\n          tokenURI\n        }\n      }\n    }\n  }\n}": types.GetEssencesDocument,
    "\n  query PrimaryProfile($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        primaryProfile {\n          id\n          profileID\n          handle\n          metadata\n          avatar\n          isPrimary\n        }\n      }\n    }\n  }\n": types.PrimaryProfileDocument,
    " query PrimaryProfileEssences($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        primaryProfile {\n          essences {\n            totalCount\n            edges {\n              node {\n                essenceID\n                tokenURI\n                createdBy {\n                  handle\n                  metadata\n                  avatar\n                  profileID\n                }\n                isCollectedByMe(me: $address)\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.PrimaryProfileEssencesDocument,
    "\n  mutation Relay($input: RelayInput!) {\n    relay(input: $input) {\n      relayActionId\n    }\n  }\n": types.RelayDocument,
    "\n  query RelayActionStatus($relayActionId: ID!) {\n    relayActionStatus(relayActionId: $relayActionId) {\n      ... on RelayActionStatusResult {\n        txHash\n        txStatus\n      }\n      ... on RelayActionError {\n        reason\n        lastKnownTxHash\n      }\n      ... on RelayActionQueued {\n        queuedAt\n      }\n    }\n  }\n": types.RelayActionStatusDocument,
    "query VerifyMetaData($metaData: VerifyEssenceMetadataInput!){\n    verifyEssenceMetadata(input: $metaData){\n      verified\n    }\n  }": types.VerifyMetaDataDocument,
    "\n  mutation LoginGetMessage($input: LoginGetMessageInput!) {\n    loginGetMessage(input: $input) {\n      message\n    }\n  }\n": types.LoginGetMessageDocument,
    "mutation loginVerify ($domain:String!,$address:AddressEVM!,$signature:String!) \n{\n  loginVerify(input:{\n    domain:$domain,\n    address:$address,\n    signature:$signature\n  }){\n    accessToken\n  }\n}": types.LoginVerifyDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Accounts($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        profiles {\n          totalCount\n          edges {\n            node {\n              id\n              profileID\n              handle\n              metadata\n              avatar\n              isPrimary\n            }\n          }\n        }\n      }\n    }\n  }"): (typeof documents)["query Accounts($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        profiles {\n          totalCount\n          edges {\n            node {\n              id\n              profileID\n              handle\n              metadata\n              avatar\n              isPrimary\n            }\n          }\n        }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCollectEssenceTypedData(\n    $input: CreateCollectEssenceTypedDataInput!\n  ) {\n    createCollectEssenceTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCollectEssenceTypedData(\n    $input: CreateCollectEssenceTypedDataInput!\n  ) {\n    createCollectEssenceTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateRegisterEssenceTypedData(\n    $input: CreateRegisterEssenceTypedDataInput!\n  ) {\n    createRegisterEssenceTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRegisterEssenceTypedData(\n    $input: CreateRegisterEssenceTypedDataInput!\n  ) {\n    createRegisterEssenceTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {\n    createSubscribeTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {\n    createSubscribeTypedData(input: $input) {\n      typedData {\n        id\n        sender\n        data\n        nonce\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getEssences($appID: String!, $handle: String!){\n  profileByHandle(handle: $handle){\n    essences(appID: $appID) {\n      totalCount\n      edges {\n        node {\n          name\n          tokenURI\n        }\n      }\n    }\n  }\n}"): (typeof documents)["\nquery getEssences($appID: String!, $handle: String!){\n  profileByHandle(handle: $handle){\n    essences(appID: $appID) {\n      totalCount\n      edges {\n        node {\n          name\n          tokenURI\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PrimaryProfile($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        primaryProfile {\n          id\n          profileID\n          handle\n          metadata\n          avatar\n          isPrimary\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PrimaryProfile($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        primaryProfile {\n          id\n          profileID\n          handle\n          metadata\n          avatar\n          isPrimary\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " query PrimaryProfileEssences($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        primaryProfile {\n          essences {\n            totalCount\n            edges {\n              node {\n                essenceID\n                tokenURI\n                createdBy {\n                  handle\n                  metadata\n                  avatar\n                  profileID\n                }\n                isCollectedByMe(me: $address)\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)[" query PrimaryProfileEssences($address: AddressEVM!) {\n    address(address: $address) {\n      wallet {\n        primaryProfile {\n          essences {\n            totalCount\n            edges {\n              node {\n                essenceID\n                tokenURI\n                createdBy {\n                  handle\n                  metadata\n                  avatar\n                  profileID\n                }\n                isCollectedByMe(me: $address)\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Relay($input: RelayInput!) {\n    relay(input: $input) {\n      relayActionId\n    }\n  }\n"): (typeof documents)["\n  mutation Relay($input: RelayInput!) {\n    relay(input: $input) {\n      relayActionId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RelayActionStatus($relayActionId: ID!) {\n    relayActionStatus(relayActionId: $relayActionId) {\n      ... on RelayActionStatusResult {\n        txHash\n        txStatus\n      }\n      ... on RelayActionError {\n        reason\n        lastKnownTxHash\n      }\n      ... on RelayActionQueued {\n        queuedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query RelayActionStatus($relayActionId: ID!) {\n    relayActionStatus(relayActionId: $relayActionId) {\n      ... on RelayActionStatusResult {\n        txHash\n        txStatus\n      }\n      ... on RelayActionError {\n        reason\n        lastKnownTxHash\n      }\n      ... on RelayActionQueued {\n        queuedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query VerifyMetaData($metaData: VerifyEssenceMetadataInput!){\n    verifyEssenceMetadata(input: $metaData){\n      verified\n    }\n  }"): (typeof documents)["query VerifyMetaData($metaData: VerifyEssenceMetadataInput!){\n    verifyEssenceMetadata(input: $metaData){\n      verified\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginGetMessage($input: LoginGetMessageInput!) {\n    loginGetMessage(input: $input) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation LoginGetMessage($input: LoginGetMessageInput!) {\n    loginGetMessage(input: $input) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation loginVerify ($domain:String!,$address:AddressEVM!,$signature:String!) \n{\n  loginVerify(input:{\n    domain:$domain,\n    address:$address,\n    signature:$signature\n  }){\n    accessToken\n  }\n}"): (typeof documents)["mutation loginVerify ($domain:String!,$address:AddressEVM!,$signature:String!) \n{\n  loginVerify(input:{\n    domain:$domain,\n    address:$address,\n    signature:$signature\n  }){\n    accessToken\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;