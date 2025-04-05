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
  passReqToCallback: true,
}

passport.use(
  new JwtStrategy(jwtStrategyOptions, async (req, jwt_payload, done) => {
    try {
      const user = await db.user.getUserByUserId(jwt_payload.user.id);

      if (user) {
        req.user = user;
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.error(err);
    }
  })
);

router.post('/register', controllers.auth.handleRegister, controllers.auth.hashPassword, controllers.user.createUser);
router.post('/login', controllers.auth.processLogin);

module.exports = router;
