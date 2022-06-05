const {desks} = require("../models")

const createDesk = async (req, res) => {
  const {name, userId, status} = req.body;
  try {
      const newDesk = await desks.create({
          name,
          userId,
          status,
          likes: 0,
          rates: 0
      })
      res.status(201).send(newDesk)
  } catch (error) { 
      res.status(500).send(error)
      
  }

}

const deleteDesk = async (req, res) => {
  const {id} = req.params;
  try {
      await desks.destroy({where: {id}});
      res.send("Deleted!");
  } catch (error) {
      res.status(500).send(error);
      
  }
}

const getDesksByUserId = async (req,res) => {
  const {userId} = req.params;
  try {
      const deskList = await desks.findAll({where: {userId}});
      res.send(deskList);
  } catch (error) {
      res.status(500).send(error)
  }
}

const updateDesks = async (req, res) => {
  const {id} = req.params;
  const {name, status} = req.body;
  try {
      if (name) await desks.update({name: name}, {where: {id}});
      if (status) await desks.update({status: status}, {where: {id}});
      const userFind = await desks.findOne({where: {id}});
      res.send({msg: "Updated!", userFind});
  } catch (error) {
      res.status(500).send(error)
  }
}


module.exports = {
    createDesk,
    deleteDesk,
    getDesksByUserId,
    updateDesks
}