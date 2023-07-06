const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User, Login, Token } = require("../database");
const jwt = require("jsonwebtoken");

const jwtSecret = "pfhenry37bg12"; // Replace with your own secret key

// Configure the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Here, you can verify the payload and find the user based on the token
    // For example, you can look up the user in your database and pass it to the 'done' callback
    const user = await User.findOne({
      where: { userId: payload.userId },
      include: [Login],
    });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

passport.use(strategy);

// Login handler
async function login(req, res, next) {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err, authenticatedUser, info) => {
      try {
        if (err) {
          console.error("Error during login:", err);
          return next(err);
        }

        if (authenticatedUser) {
          console.log("User is already logged in.");
          return res
            .status(403)
            .json({ message: "User is already logged in." });
        }

        const { email, password } = req.body;

        // Find the login record for the provided email
        const login = await Login.findOne({ where: { email } });

        if (!login) {
          console.log("Authentication failed");
          return res.status(401).json({ message: "Authentication failed" });
        }

        // Validate the password
        const isValidPassword = login.validatePassword(password);
        if (!isValidPassword) {
          console.log("Authentication failed");
          return res.status(401).json({ message: "Authentication failed" });
        }

        // Retrieve the associated user record
        const user = await User.findOne({ where: { userId: login.userId } });

        if (!user) {
          console.log("Authentication failed");
          return res.status(401).json({ message: "Authentication failed" });
        }

        // Generate the JWT token
        const token = jwt.sign(
          {
            userId: user.userId,
            email: login.email,
          },
          jwtSecret,
          { expiresIn: "2h" },
        );

        console.log("Generated Token:", token);

        // Insert token into the Token table
        await Token.create({
          tokenValue: token,
          tokenType: "Passport",
          userId: user.userId,
          loginId: login.loginId,
        });

        console.log("Login successful");

        return res.json({ message: "Login successful", token });
      } catch (error) {
        console.error("Error during login:", error);
        return next(error);
      }
    },
  )(req, res, next);
}

module.exports = {
  login,
};
