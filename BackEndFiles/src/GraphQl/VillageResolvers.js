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
          { new: true }
        );

        if (!updatedVillage) {
          throw new Error('Village not found');
        }

        return updatedVillage;
      } catch (error) {
        throw new Error('Error updating village: ' + error.message);
      }
    },
    addDemographicData: async (
      _,
      { id, PopulationSize, AgeDistribution, GenderRatios, PopulationGrowthRate }
    ) => {
      try {
        const updatedVillage = await VillageModel.findByIdAndUpdate(
          id,
          {
            'DemographicData.PopulationSize': PopulationSize,
            'DemographicData.AgeDistribution': AgeDistribution,
            'DemographicData.GenderRatios': GenderRatios,
            'DemographicData.PopulationGrowthRate': PopulationGrowthRate,
          },
          { new: true }
        );

        if (!updatedVillage) {
          throw new Error('Village not found');
        }

        return updatedVillage;
      } catch (error) {
        throw new Error('Error adding demographic data: ' + error.message);
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
