// const passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// const { ExtractJwt } = require("passport-jwt");
// const { User, Login } = require("../database");

// const jwtSecret = "pfhenry37bg12";

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: jwtSecret,
// };

// passport.use(
//   new JwtStrategy(jwtOptions, async (payload, done) => {
//     try {
//       const login = await Login.findOne({ where: { email: payload.email } });

//       if (!login) {
//         return done(null, false, { message: "Incorrect email or password." });
//       }

//       const isValidPassword = login.validatePassword(payload.password);
//       if (!isValidPassword) {
//         return done(null, false, { message: "Incorrect email or password." });
//       }

//       const user = await User.findOne({ where: { userId: login.userId } });

//       if (!user) {
//         return done(null, false, { message: "User not found." });
//       }

//       return done(null, user);
//     } catch (error) {
//       console.error("JWT authentication error:", error);
//       return done(error);
//     }
//   }),
// );

// passport.serializeUser((user, done) => {
//   done(null, user.userId);
// });

// passport.deserializeUser(async (userId, done) => {
//   try {
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return done(null, false, { message: "User not found." });
//     }

//     done(null, user);
//   } catch (error) {
//     console.error("Error deserializing user:", error);
//     done(error);
//   }
// });

// module.exports = passport;
