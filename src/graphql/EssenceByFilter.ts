import { gql } from "@/Types/__generated__";

export const ESSENCES_BY_FILTER = gql(`
  query essencesByFilter($appID: String, $me: AddressEVM!) {
    essencesBy(appID: $appID) {
			totalCount,
      pageInfo{
        startCursor,
        endCursor,
        hasNextPage,
				hasPreviousPage
      }
      edges{
        node{
          essenceID
          tokenURI
          contractAddress
          createdBy{
            handle
            avatar
            profileID
          }
          metadata{
            tags
            issue_date
            description
          }
          contentID
          commentCount
          likeCount
          likedStatus(me:$me){
            disliked
            liked
          }
        }
      }
    }
  }
`);
