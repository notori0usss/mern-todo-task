const express = require("express")
const {signin, signup, users} = require("../controllers/userController");
const userRouter = express.Router()

userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.get("/", users)
module.exports = userRouter