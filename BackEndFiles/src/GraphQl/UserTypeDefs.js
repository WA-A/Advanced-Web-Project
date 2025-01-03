import { gql } from 'apollo-server-express';

export const UserTypeDefs = gql`
  type User {
    id: ID!
    UserName: String!
    Email: String!
    Password: String!
    Role: String!
    IsDeleted: Boolean!
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    message: String!
    Token: String
    user: User
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    SignUp(UserName: String!, Email: String!, Password: String!): AuthPayload
    SignIn(UserName: String!, Password: String!): AuthPayload
  }
`;
