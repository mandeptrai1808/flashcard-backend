const {cards} = require("../models");

const createCard = async (req, res) => {
  const {frontContent, backContent, deskId, imageUrl} = req.body;
  try {
      const newCard = await cards.create({frontContent, backContent, deskId, imageUrl});
      res.status(201).send(newCard);
  } catch (error) {
      res.status(500).send(error);
  }
}

const getCardByDeskId = async (req, res) => {
  const {deskId} = req.params;
  try {
      const cardList = await cards.findAll({where: {deskId}});
      res.send(cardList);
  } catch (error) {
      res.status(500).send(error);
  }
}

const deleteCard = async (req, res) => {
  const {id} = req.params;
  try {
    if (await cards.findOne({where: {id}})){
        await cards.destroy({where: {id}});
        res.send("Deleted!");
    }
    else res.status(404).send("NOT FOUND!");
  } catch (error) {
      res.status(500).send(error);
  }
}

const updateCards = async (req, res) => {
    const {id} = req.params;
    const {frontContent, backContent, imageUrl} = req.body;
    try {
        if (frontContent) await cards.update({frontContent}, {where: {id}});
        if (backContent) await cards.update({backContent}, {where: {id}});
        if (imageUrl) await cards.update({imageUrl}, {where: {id}});
        const cardFind = await cards.findOne({where: {id}});
        res.send(cardFind);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createCard,
    getCardByDeskId,
    deleteCard,
    updateCards
}