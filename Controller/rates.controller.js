const {rates} = require("../models");

const userRateDesk = async (req, res) => {
  const {userId, deskId, star} = req.body;
  try {
    const newRate = await rates.create({userId, deskId, star});
    res.status(201).send(newRate);
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteRate = async (req, res) => {
    const {userId, deskId} = req.body;
    try {
        await rates.destroy({where: {userId}});
        res.send("Deleted");
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateRate = async (req, res) => {
  const {userId, deskId, star} = req.body;
  try {
    await rates.update({star}, {where: {userId, deskId}});
    const newRate = await rates.findOne({where: {userId, deskId}});
    res.send(newRate);
  } catch (error) {
    res.status(500).send(error);
    
  }
}
module.exports = {
    userRateDesk,
    deleteRate,
    updateRate
}