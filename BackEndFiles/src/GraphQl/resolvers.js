import { UserResolvers } from './UserResolvers.js';
import { VillageResolvers } from './VillageResolvers.js';
import { ChatResolver } from './ChatResolver.js';
import { GallaryResolvers } from './GallaryResolver.js';

export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...VillageResolvers.Query,
    ...ChatResolver.Query,
    ...GallaryResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...VillageResolvers.Mutation,
    ...ChatResolver.Mutation,
    ...GallaryResolvers.Mutation,
  },
};
