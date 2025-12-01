const express = require("express");
const passport = require("passport");
const router = express.Router();

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/auth/profile");
    }
);

router.get("/profile", ensureAuth, (req, res) => {
    res.send(`
    <h1>Bem-vindo, ${req.user.displayName || req.user.emails[0].value}</h1>
    <form action="/auth/logout" method="POST">
      <button type="submit">Logout</button>
    </form>
  `);
});

router.post("/logout", (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
});

module.exports = router;
