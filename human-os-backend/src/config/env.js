const dotenv = require('dotenv');

dotenv.config();

const REQUIRED_VARS = [
  'PORT',
  'MONGODB_URI',
  'CLIENT_ORIGIN',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
];

function validateEnv() {
  const missing = REQUIRED_VARS.filter((key) => {
    const value = process.env[key];

    return (
      value === undefined ||
      value === null ||
      value.trim() === ''
    );
  });

  if (missing.length > 0) {
    console.error(
      `[env] Missing required environment variable(s): ${missing.join(', ')}`
    );

    process.exit(1);
  }
}

validateEnv();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',

  port: Number(process.env.PORT),

  mongodbUri: process.env.MONGODB_URI,

  clientOrigin: process.env.CLIENT_ORIGIN,

  jwtSecret: process.env.JWT_SECRET,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = env;