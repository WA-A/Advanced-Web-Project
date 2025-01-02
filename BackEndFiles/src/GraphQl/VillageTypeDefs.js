import { gql } from 'apollo-server-express';

export const VillageTypeDefs = gql`
  type DemographicData {
    PopulationSize: Int
    AgeDistribution: String
    GenderRatios: String
    PopulationGrowthRate: Float
  }

  type Village {
    id: ID!
    Name: String!
    Region: String!
    LandArea: Float!
    Latitude: Float!
    Longitude: Float!
    ImageUrl: String
    Categories: [String!] 
    DemographicData: DemographicData
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
    
    addDemographicData(
      id: ID!
      PopulationSize: Int
      AgeDistribution: String
      GenderRatios: String
      PopulationGrowthRate: Float
    ): Village!
    
    deleteVillage(id: ID!): Village!
  }
`;
