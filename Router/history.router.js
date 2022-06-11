const express = require('express');
const { PushNewHistory } = require('../Controller/history.controller');
const historyRouter = express.Router();

historyRouter.post("/push", PushNewHistory)

module.exports = {
    historyRouter
}