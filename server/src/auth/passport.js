const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User, Login } = require("../database");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const login = await Login.findOne({ where: { email } });
        if (!login) {
          return done(null, false, { message: "Incorrect email." });
        }

        const isValidPassword = login.validatePassword(password);
        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password." });
        }

        const user = await User.findOne({ where: { userId: login.userId } });
        if (!user) {
          return done(null, false, { message: "User not found." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ where: { userId } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
