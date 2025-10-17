const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/api", userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
