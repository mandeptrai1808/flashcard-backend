const {history} = require("../models")

const PushNewHistory = async (req, res) => {
  const {userId, deskId} = req.body;
  try {
    await history.destroy({where: {userId, deskId}});
    const newHistory = await history.create({userId, deskId});
    res.status(201).send(newHistory);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
    PushNewHistory
}