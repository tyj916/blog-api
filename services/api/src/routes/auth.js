require('dotenv').config();
const { Router } = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const controllers = require('../controllers');
const db = require('../db');

const router = Router();
const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(jwtStrategyOptions, async (jwt_payload, done) => {
    try {
      const user = await db.getUserByUserId(jwt_payload.user.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.error(err);
    }
  })
);

router.post(
  '/login',
  controllers.auth.processLogin,
);

module.exports = router;
