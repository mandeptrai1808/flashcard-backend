const express = require("express");
const { userRateDesk, deleteRate, updateRate } = require("../Controller/rates.controller");
const rateRouter = express.Router();

rateRouter.post("/", userRateDesk);
rateRouter.delete("/", deleteRate);
rateRouter.put("/", updateRate)
module.exports = {
    rateRouter
}