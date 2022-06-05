const express = require("express");
const { createUser, loginUser, uploadAvatar, updateUser } = require("../Controller/users.controller");
const { authenticate } = require("../Middleware/Auth/authenticate");
const { uploadImg } = require("../Middleware/Upload/uploadImg");
const userRouter = express.Router();


userRouter.post("/", createUser);
userRouter.post("/login", loginUser)
userRouter.post("/upload-avatar", authenticate, uploadImg("Avatar"), uploadAvatar)
userRouter.put("/update/:id", updateUser)

module.exports = {
    userRouter
}