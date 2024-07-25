const { env } = process;
const config = {
  port: +env.PORT || 9687,
  dbUrl: env.DB_URL,
  nodeEnv: env.NODE_ENV,
  jwtSecretKey: env.JWT_SECRET_KEY,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
};

module.exports = config;
