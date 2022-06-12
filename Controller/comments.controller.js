const {comments} = require("../models");

const createNewComment = async (req, res) => {
  const {content, username, avatar, deskId} = req.body;
  try {
    const newComment = await comments.create({
        content, username, avatar, deskId
    })
    res.status(201).send(newComment);
  } catch (error) {
    res.status(500).send(error)    
  }
}

const getCommentsByDeskId = async (req,res) => {
  const {deskId} = req.params;
  console.log(deskId)
  try {
    let result = await comments.findAll({where: {deskId}});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
    createNewComment,
    getCommentsByDeskId
}