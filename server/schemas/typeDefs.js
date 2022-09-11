const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    eventCount: Int
    savedEvents: [Event]
  }

  type Events {
    eventId: ID!
    location: String
    date: [String]
    longitude: [String]
    latitude: [String]
    summary: String
    link: String
    header: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input EventInput {
    location: [String]
    eventName: [String]
    description: String!
    eventId: String!
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveEvent(eventData: EventInput!): User
    removeEvent(eventId: ID!): User
  }
`;

module.exports = typeDefs;
