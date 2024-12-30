import VillageModel from '../Model/Village.Model.js';

export const VillageResolvers = {
  Mutation: {
    addVillage: async (_, { Name, Region, LandArea, Latitude, Longitude, ImageUrl, Categories }) => {
      try {
        const newVillage = await VillageModel.create({
          Name,
          Region,
          LandArea,
          Latitude,
          Longitude,
          ImageUrl,
          Categories,
        });
        return newVillage;
      } catch (error) {
        throw new Error('Error adding village: ' + error.message);
      }
    },
  },

  Query: {
    getAllVillages: async () => {
      return await VillageModel.find();
    },
   
  },
};



 
  