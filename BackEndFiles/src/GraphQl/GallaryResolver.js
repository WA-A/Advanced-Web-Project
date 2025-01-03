import GallaryModel from "../Model/Gallary.js";

export const GallaryResolvers = {
  Query: {
    getImages: async () => {
      try {
        const images = await GallaryModel.find();
        return images;
      } catch (error) {
        throw new Error('Error fetching images');
      }
    },
  },
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


