const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      trim: true,
      default: '',
    },

    age: {
      type: Number,
      min: 0,
      max: 150,
    },

    // Height in centimeters
    height: {
      type: Number,
      min: 50,
      max: 250,
    },

    // Weight in kilograms
    weight: {
      type: Number,
      min: 10,
      max: 300,
    },

    gender: {
      type: String,
      trim: true,
      default: '',
    },

    occupation: {
      type: String,
      trim: true,
      default: '',
    },

    location: {
      type: String,
      trim: true,
      default: '',
    },

    bio: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);