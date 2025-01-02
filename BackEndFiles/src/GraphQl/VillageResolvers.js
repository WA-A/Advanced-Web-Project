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
    updateVillage: async (_, { id, Name, Region, LandArea, Latitude, Longitude, ImageUrl, Categories }) => {
      try {
        const updatedVillage = await VillageModel.findByIdAndUpdate(
          id,
          {
            Name,
            Region,
            LandArea,
            Latitude,
            Longitude,
            ImageUrl,
            Categories,
          },
          { new: true } // Return the updated document
        );

        if (!updatedVillage) {
          throw new Error('Village not found');
        }

        return updatedVillage;
      } catch (error) {
        throw new Error('Error updating village: ' + error.message);
      }
    },
  },
  Query: {
    getVillages: async () => {
      return await VillageModel.find();
    },
    getVillageById: async (_, { id }) => {
      return await VillageModel.findById(id);
    },
  },
};
