import { gql } from 'apollo-server-express';
import { UserTypeDefs } from './UserTypeDefs.js';
import { VillageTypeDefs } from './VillageTypeDefs.js';
import { ChatTypeDefs } from './ChatTypeDefs.js';

export const typeDefs = gql`
  ${UserTypeDefs}
  ${VillageTypeDefs}
  ${ChatTypeDefs}
`;
