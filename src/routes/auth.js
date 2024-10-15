import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import session from "express-session";

const route = express();

// Passport session setup
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Google OAuth strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/callback/google",
    },
    (accessToken, refreshToken, profile, done) => {
      // Save user information into the session
      const user = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };
      done(null, user);
    }
  )
);

// Initialize session and passport
route.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: true })
);
route.use(passport.initialize());
route.use(passport.session());

route.post("/api/auth/google", (req, res) => {
  const token = req.body.token;
  if (token) {
    // Verify the token with Google
    const payload = verifyGoogleToken(token); // You will need to implement this
    res.json(payload);
  } else {
    res.status(400).json({ error: "No token provided" });
  }
});

export default route;
