const express = require("express");
const SignupUser = require("./controllers/SignupUser");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("Hi there"));
app.get("/api/v1/signup", (req, res) => {
  res.send("got it man");
});
app.post("/api/v1/signup", SignupUser);
const init = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => console.log("We are a go"));
  } catch (error) {
    console.log({ error });
  }
};
init();
