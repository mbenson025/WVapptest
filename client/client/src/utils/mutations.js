import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_EVENT = gql`
  mutation saveEvent($eventData: eventInput!) {
    saveEvent(eventData: $eventData) {
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
    }
  }
`;

export const SAVE_EVENT = gql`
  mutation saveEvent($eventData: eventInput!) {
    saveEvent(eventData: $eventData) {
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

export const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
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

export const REMOVE_event = gql`
  mutation removeevent($eventId: ID!) {
    removeevent(eventId: $eventId) {
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
    }
  }
`;
