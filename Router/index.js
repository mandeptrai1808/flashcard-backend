const express = require("express");
const { deskRouter } = require("./desks.router");
const { userRouter } = require("./users.router");
const {cardRouter} = require("./cards.router");
const { likeRouter } = require("./likes.router");
const { rateRouter } = require("./rates.router");
const { historyRouter } = require("./history.router");
const { commentRouter } = require("./comments.router");
const { notificationRouter } = require("./notification.router");
const rootRouter = express.Router();

rootRouter.use("/users", userRouter)
rootRouter.use("/desks", deskRouter)
rootRouter.use("/cards", cardRouter)
rootRouter.use("/likes", likeRouter)
rootRouter.use("/rates", rateRouter)
rootRouter.use("/history", historyRouter)
rootRouter.use("/comments", commentRouter)
rootRouter.use("/notifications", notificationRouter)
module.exports = {
    rootRouter
}