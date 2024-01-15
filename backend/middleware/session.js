const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { redisClient } = require("../helpers/init_redis");

const redisStore = new RedisStore({ client: redisClient });
module.exports = session({
  store: redisStore,
  secret: process.env.REDIS_SECRET,
  saveUninitalized: false,
  sameSite: true,
  resave: false,
  cookie: {
    secure: false, // change to true in production
    httpOnly: true,
    maxAge: 1000 * 5 * 60,
  },
});
