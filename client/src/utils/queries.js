import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      SavedMoments {
        image
        description
        title
        link
      }
    }
  }
`;
