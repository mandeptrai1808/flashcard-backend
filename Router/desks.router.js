const express = require("express");
const { createDesk, deleteDesk, getDesksByUserId, updateDesks, getDeskById, getDesksLikedByUserId, getHistoryDesks } = require("../Controller/desks.controller");
const deskRouter = express.Router();

deskRouter.post("/", createDesk)
deskRouter.delete("/delete/:id", deleteDesk)
deskRouter.get("/getdesks/:userId", getDesksByUserId)
deskRouter.get("/getdesksliked/:userId", getDesksLikedByUserId)
deskRouter.get('/gethistories/:userId', getHistoryDesks)
deskRouter.put("/update/:id", updateDesks)
deskRouter.get("/:id", getDeskById)
module.exports = {
    deskRouter
}