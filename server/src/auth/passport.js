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
          return done(null, false, { message: "Incorrect email or password." });
        }

        const isValidPassword = login.validatePassword(password);
        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        const user = await User.findOne({ where: { userId: login.userId } });

        if (!user) {
          return done(null, false, { message: "User not found." });
        }

        // Set the 'verify' property to true for the logged-in user
        await login.update({ verify: true });

        return done(null, user);
      } catch (error) {
        console.error("Passport local strategy error:", error);
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
    const user = await User.findByPk(userId);

    if (!user) {
      return done(null, false, { message: "User not found." });
    }

    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error);
  }
});

module.exports = passport;
