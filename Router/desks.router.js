const express = require("express");
const { createDesk, deleteDesk, getDesksByUserId, updateDesks } = require("../Controller/desks.controller");
const deskRouter = express.Router();

deskRouter.post("/", createDesk)
deskRouter.delete("/delete/:id", deleteDesk)
deskRouter.get("/getdesks/:userId", getDesksByUserId)
deskRouter.put("/update/:id", updateDesks)

module.exports = {
    deskRouter
}