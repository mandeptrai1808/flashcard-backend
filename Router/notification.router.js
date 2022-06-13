const express = require('express');
const { createNewNotifications, deleteNotification, listNotifications } = require('../Controller/notifications.controller');
const notificationRouter = express.Router();

notificationRouter.post('/', createNewNotifications);
notificationRouter.delete('/:id', deleteNotification)
notificationRouter.get("/:userId", listNotifications)

module.exports = {
    notificationRouter
}