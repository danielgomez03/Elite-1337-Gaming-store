const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Op } = require('sequelize');
const { GOOGLE_ID, GOOGLE_SECRET } = process.env;
const { User, Login, Token } = require("../database");
const { generateAuthToken } = require("./auth");

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            callbackURL: 'http://localhost:3001/login/callbackGoogle',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { emails, displayName } = profile;
                const email = emails[0].value;

                let login = await Login.findOne({ email });

                if (!login) {
                    const names = displayName.split(' ');
                    const firstName = names.slice(0, -1).join(' ');
                    const lastName = names[names.length - 1];

                    const newUser = await User.create({
                        firstName,
                        lastName,
                    });

                    login = await Login.create({
                        googleId: profile.id,
                        email,
                        userId: newUser.userId,
                    });
                } else {
                    login.googleId = profile.id;
                    await login.save();
                }

                const user = await User.findOne({ where: { userId: login.userId } });

                const token = generateAuthToken(login.userId, email);
                const expiresIn = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
                const expiresAt = new Date(Date.now() + expiresIn);

                await Token.destroy({
                    where: {
                        userId: login.userId,
                        tokenValue: {
                            [Op.not]: token,
                        },
                    },
                });

                const createdToken = await Token.create({
                    tokenValue: token,
                    tokenType: "Passport",
                    userId: login.userId,
                    loginId: login.loginId,
                    expiresAt,
                });

                return done(null, {
                    message: "Login successful",
                    generatedToken: token,
                    createdToken,
                    userId: login.userId,
                });
            } catch (error) {
                return done(error, false);
            }
        }
    )
);
