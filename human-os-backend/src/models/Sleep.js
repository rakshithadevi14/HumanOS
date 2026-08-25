const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    sleepDate: {
      type: Date,
      required: true,
    },

    bedtime: {
      type: Date,
      required: true,
    },

    wakeTime: {
      type: Date,
      required: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
      max: 1440,
    },

    quality: {
      type: String,
      enum: ['poor', 'fair', 'good', 'excellent'],
      default: 'good',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sleep', sleepSchema);