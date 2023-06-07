// Environement variables setup
require("dotenv").config();

// Express
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const route_prefix = "/api";

app.use(`${route_prefix}/auth`, require("./routers/auth.router")); // auth router

app.listen(process.env.PORT, () => {
  console.log(`Listening to http://localhost:${process.env.PORT}`);
});
