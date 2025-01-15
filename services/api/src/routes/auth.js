require('dotenv').config();
const { Router } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const controllers = require('../controllers');
const db = require('../db');

const router = Router();
const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserByUserId(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

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
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  controllers.auth.signJWT,
);

module.exports = router;
