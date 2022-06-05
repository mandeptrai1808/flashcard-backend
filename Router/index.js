const express = require("express");
const { deskRouter } = require("./desks.router");
const { userRouter } = require("./users.router");
const {cardRouter} = require("./cards.router")
const rootRouter = express.Router();

rootRouter.use("/users", userRouter)
rootRouter.use("/desks", deskRouter)
rootRouter.use("/cards", cardRouter)
module.exports = {
    rootRouter
}