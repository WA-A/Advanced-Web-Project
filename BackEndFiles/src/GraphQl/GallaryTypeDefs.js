import { gql } from 'apollo-server-express';

export const GallaryTypeDefs = gql`
  type Image {
    id: ID!
    url: String!
    description: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getImages: [Image!]!
  }

  type Mutation {
    addImage(url: String!, description: String!): Image!
    
  }
`;


