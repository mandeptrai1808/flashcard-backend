const express = require('express');
const { userLikeThisDesk, userUnlikeThisDesk } = require('../Controller/likes.controller');
const likeRouter = express.Router();

likeRouter.post("/likedesk", userLikeThisDesk)
likeRouter.delete("/unlikedesk", userUnlikeThisDesk)
module.exports = {
    likeRouter
}