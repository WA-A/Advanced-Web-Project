import { gql } from 'apollo-server-express';

export const VillageTypeDefs = gql`
  type Village {
    id: ID!
    Name: String!
    Region: String!
    LandArea: Float!
    Latitude: Float!
    Longitude: Float!
    ImageUrl: String
    Categories: [String!] 
  }
  
  type Query {
    getVillages: [Village!]!
    getVillageById(id: ID!): Village
  }
  
  type Mutation {
    addVillage(
      Name: String! 
      Region: String! 
      LandArea: Float! 
      Latitude: Float! 
      Longitude: Float! 
      ImageUrl: String 
      Categories: [String!] 
    ): Village!
    updateVillage(
    id: ID!
    Name: String
    Region: String
    LandArea: Float
    Latitude: Float
    Longitude: Float
    ImageUrl: String
    Categories: [String]
  ): Village!
  }
`;
