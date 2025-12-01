const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();
require("./config/google")();

const authRoutes = require("./routes/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send(`
    <h1>Login com Google</h1>
    <a href="/auth/google">Fazer login</a>`);
});

app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
