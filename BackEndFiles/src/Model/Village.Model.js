import mongoose, { Schema, model } from 'mongoose';

const villageSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Region: {
    type: String,
    required: true,
  },
  LandArea: {
    type: Number,
    required: true,
  },
  Latitude: {
    type: Number,
    required: true,
  },
  Longitude: {
    type: Number,
    required: true,
  },
  ImageUrl: {
    type: String,
  },
  Categories: {
    type: [String],
  },
  // Demographic Data
  DemographicData: {
    PopulationSize: {
      type: Number,
      required: false, // Make it optional for now
    },
    AgeDistribution: {
      type: String,
      required: false,
    },
    GenderRatios: {
      type: String,
      required: false,
    },
    PopulationGrowthRate: {
      type: Number,
      required: false,
    },
  },
});

const VillageModel = model('Village', villageSchema);

export default VillageModel;
