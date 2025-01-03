import GallaryModel from "../Model/Gallary.js";

export const GallaryResolvers = {
  Mutation: {
    addImage: async (_, { url, description }) => {
      try {
        const newImage = new GallaryModel({ url, description });
        await newImage.save();
        return newImage;
      } catch (error) {
        throw new Error('Error adding image');
      }
    },
   
  },
};


