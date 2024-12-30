import { UserResolvers } from './UserResolvers.js';
import { VillageResolvers } from './VillageResolvers.js';

export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...VillageResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...VillageResolvers.Mutation,
  },
};
