const { validationResult } = require('express-validator');

const Water = require('../models/Water');

async function createWaterEntry(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid water data',
          details: errors.array(),
        },
      });
    }

    const { amountMl, recordedAt } = req.body;

    const waterEntry = await Water.create({
      userId: req.user.userId,
      amountMl,
      recordedAt: recordedAt || new Date(),
    });

    return res.status(201).json({
      success: true,
      data: {
        water: waterEntry,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getWaterEntries(req, res, next) {
  try {
    const waterEntries = await Water.find({
      userId: req.user.userId,
    }).sort({
      recordedAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: {
        water: waterEntries,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createWaterEntry,
  getWaterEntries,
};