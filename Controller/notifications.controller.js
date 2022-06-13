const {notifications} = require('../models')

const createNewNotifications = async (req, res) => {
  const {content, username, avatar, userId} = req.body;
  try {
    const newNotification = await notifications.create({
        content,
        username,
        avatar,
        userId
    })
    res.status(201).send(newNotification);
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteNotification = async (req, res) => {
  const {id} = req.params;
  try {
    await notifications.destroy({where: {id}});
    res.send("DELETED");
  } catch (error) {
    res.status(500).send(error);    
  }
}

const listNotifications = async (req, res) => {
  const {userId} = req.params;
  try {
    const result = await notifications.findAll({where: {userId}});
    res.send(result);
  } catch (error) {
    res.status(500).send(error)
  }
  
}
module.exports = {
    createNewNotifications,
    deleteNotification,
    listNotifications
}