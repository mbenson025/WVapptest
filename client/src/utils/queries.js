import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedEvents {
        eventId
        authors
        image
        description
        title
        link
      }
      savedEvents {
        eventId
        location
        header
        summary
        lattitude
        longitude
        link
      }
    }
  }
`;
