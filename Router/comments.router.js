const express = require('express');
const { createNewComment, getCommentsByDeskId } = require('../Controller/comments.controller');
const commentRouter = express.Router();

commentRouter.post("/newcomment", createNewComment)
commentRouter.get("/:deskId", getCommentsByDeskId)

module.exports = {
    commentRouter
}