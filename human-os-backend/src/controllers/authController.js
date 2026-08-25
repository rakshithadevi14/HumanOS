const { validationResult } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');
const { generateToken } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/password');

async function register(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid registration data',
          details: errors.array(),
        },
      });
    }

    const { email, password, name } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'An account with this email already exists',
        },
      });
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      email: normalizedEmail,
      passwordHash,
    });

    await Profile.create({
      userId: user._id,
      name: name ? name.trim() : '',
    });

    const accessToken = generateToken(user);

    return res.status(201).json({
      success: true,
      data: {
        accessToken,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid login data',
          details: errors.array(),
        },
      });
    }

    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    const passwordMatches = await comparePassword(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    const accessToken = generateToken(user);

    return res.status(200).json({
      success: true,
      data: {
        accessToken,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.user.userId).select(
      '-passwordHash'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }

    const profile = await Profile.findOne({
      userId: user._id,
    });

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
        },
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getCurrentUser,
};