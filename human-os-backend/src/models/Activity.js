const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'walking',
        'running',
        'cycling',
        'workout',
        'yoga',
        'swimming',
        'sports',
        'other',
      ],
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
      max: 1440,
    },

    calories: {
      type: Number,
      min: 0,
      max: 10000,
      default: 0,
    },

    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Activity', activitySchema);