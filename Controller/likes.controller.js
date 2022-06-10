const { likes } = require("../models");

const userLikeThisDesk = async (req, res) => {
  const { userId, deskId } = req.body;
  try {
    const newConnectLike = await likes.create({
      userId,
      deskId,
    });
    res.status(201).send(newConnectLike);
  } catch (error) {
    res.status(500).send(error);
  }
};

const userUnlikeThisDesk = async (req, res) => {
    const { userId, deskId } = req.body;
    try {
        await likes.destroy({where: {userId, deskId}});
        res.send("Deleted!");
    } catch (error) {
        res.status(500).send(error)
    }
}





module.exports = {
  userLikeThisDesk,
  userUnlikeThisDesk
};
