const express = require("express");
const { createCard, getCardByDeskId, deleteCard, updateCards } = require("../Controller/cards.controller");
const cardRouter = express.Router();

cardRouter.post("/", createCard)
cardRouter.get("/:deskId", getCardByDeskId)
cardRouter.delete("/:id", deleteCard)
cardRouter.put("/:id", updateCards)
module.exports = {
    cardRouter
}


