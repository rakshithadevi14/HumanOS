const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    mood: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'happy',
        'calm',
        'neutral',
        'sad',
        'angry',
        'anxious',
        'excited',
        'tired',
      ],
    },

    note: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
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

module.exports = mongoose.model('Mood', moodSchema);