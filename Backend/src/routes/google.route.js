import express from "express";
import passport from "passport";

const router = express.Router();

// Route to initiate Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route for Google OAuth callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/profile"); // Redirect to a logged-in page
  }
);

export default router;
