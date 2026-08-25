const { validationResult } = require('express-validator');

const Profile = require('../models/Profile');

async function getProfile(req, res, next) {
  try {
    const profile = await Profile.findOne({
      userId: req.user.userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Profile not found',
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid profile data',
          details: errors.array(),
        },
      });
    }

    const allowedFields = [
  'name',
  'age',
  'height',
  'weight',
  'gender',
  'occupation',
  'location',
  'bio',
];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const profile = await Profile.findOneAndUpdate(
      {
        userId: req.user.userId,
      },
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Profile not found',
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
};