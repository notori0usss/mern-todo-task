//Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const noteRouter = require("./routes/note");
const userRouter = require("./routes/user");

//configs
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

//Routers
app.use("/notes", noteRouter);
app.use("/users", userRouter);

//db works
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error Connection");
});
db.once("open", () => {
  console.log("Connected Database");
});

//rest api
app.get("/", (req, res) => {
  res.send("Hello Node API");
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server started on http://localhost:5000/"));
