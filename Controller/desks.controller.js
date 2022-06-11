const { desks, sequelize,likes, cards, rates, users } = require("../models");

const createDesk = async (req, res) => {
  const { name, userId, status } = req.body;
  try {
    const newDesk = await desks.create({
      name,
      userId,
      status,
      likes: 0,
      rates: 0,
    });
    res.status(201).send(newDesk);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDeskById = async (req, res) => {
  const { id } = req.params;
  try {
    // const findDesk = await desks.findOne({ where: { id } });
    const findDesk = await sequelize.query(`
    SELECT flashcard_db.desks.id, flashcard_db.desks.name,flashcard_db.desks.userId, flashcard_db.desks.likes, flashcard_db.desks.rates, flashcard_db.desks.status,
    flashcard_db.users.name as username, flashcard_db.users.avatar  FROM flashcard_db.desks
    inner join flashcard_db.users
    on flashcard_db.users.id = flashcard_db.desks.userId
    where flashcard_db.desks.id = ${id};  
    `)
    const findCards = await cards.findAll({ where: { deskId: id } });
    const listLikes = await likes.findAll({where: {deskId: id}});
    const listRates = await rates.findAll({where: {deskId: id}})
    findDesk[0][0].likes = listLikes;
    findDesk[0][0].rates = listRates;


    res.send({ desk: findDesk[0][0], cards: findCards });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteDesk = async (req, res) => {
  const { id } = req.params;
  try {
    await desks.destroy({ where: { id } });
    res.send("Deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDesksByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const deskList = await sequelize.query(`
      SELECT flashcard_db.desks.id, flashcard_db.desks.name, flashcard_db.desks.likes, flashcard_db.desks.rates, flashcard_db.desks.status,
      flashcard_db.users.name as username, flashcard_db.users.avatar FROM flashcard_db.desks
      inner join flashcard_db.users
      on flashcard_db.desks.userId = flashcard_db.users.id
      where  flashcard_db.desks.userId = ${userId}
      `);

    deskList[0].map(async (item, index) => {
      let numCard = await cards.findAll({ where: { deskId: item.id } });
      let listLike = await likes.findAll({where: {deskId: item.id}});
      let listRate = await rates.findAll({where: {deskId: item.id}});
      deskList[0][index] = { ...deskList[0][index], numCard: numCard.length, likes: listLike, rates: listRate };
      if (deskList[0].length - 1 === index) res.send(deskList[0]);
    });
    // res.send(deskList[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDesksLikedByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    const deskList = await sequelize.query(`
    SELECT flashcard_db.desks.id, flashcard_db.desks.name,flashcard_db.desks.userId, flashcard_db.desks.likes, flashcard_db.desks.rates, flashcard_db.desks.status,
flashcard_db.users.name as username, flashcard_db.users.avatar FROM flashcard_db.desks
inner join flashcard_db.users
on flashcard_db.users.id = flashcard_db.desks.userId
inner join flashcard_db.likes
on flashcard_db.likes.deskId = flashcard_db.desks.id
where flashcard_db.likes.userId = ${userId};
      `);

    deskList[0].map(async (item, index) => {
      let numCard = await cards.findAll({ where: { deskId: item.id } });
      let listLike = await likes.findAll({where: {deskId: item.id}});
      let listRate = await rates.findAll({where: {deskId: item.id}});
      deskList[0][index] = { ...deskList[0][index], numCard: numCard.length, likes: listLike, rates: listRate };
      if (deskList[0].length - 1 === index) res.send(deskList[0]);
    });
    // res.send(deskList[0]);
  } catch (error) {
    res.status(500).send(error);
  }
}

const getHistoryDesks = async (req, res) => {
  const {userId} = req.params;
  try {
    const deskList = await sequelize.query(`
    SELECT flashcard_db.desks.id, flashcard_db.histories.id as history_id, flashcard_db.desks.name, flashcard_db.desks.userId,
flashcard_db.desks.likes, flashcard_db.desks.rates, flashcard_db.desks.status,
flashcard_db.users.name as username, flashcard_db.users.avatar FROM flashcard_db.histories
inner join flashcard_db.users
on flashcard_db.users.id = flashcard_db.histories.userId
inner join flashcard_db.desks
on flashcard_db.desks.id = flashcard_db.histories.deskId
where flashcard_db.users.id = ${userId};
      `);
    deskList[0].map(async (item, index) => {
      let numCard = await cards.findAll({ where: { deskId: item.id } });
      let listLike = await likes.findAll({where: {deskId: item.id}});
      let listRate = await rates.findAll({where: {deskId: item.id}});
      let ownOfDesk = await users.findOne({where: {id: item.userId}});
      deskList[0][index].username = ownOfDesk.name;
      deskList[0][index].avatar = ownOfDesk.avatar;
      deskList[0][index] = { ...deskList[0][index] ,numCard: numCard.length, likes: listLike, rates: listRate };
      if (deskList[0].length - 1 === index) res.send(deskList[0]);
    });
    // res.send(deskList[0]);
  } catch (error) {
    res.status(500).send(error);
  }
}

const updateDesks = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    if (name) await desks.update({ name: name }, { where: { id } });
    if (status) await desks.update({ status: status }, { where: { id } });
    const userFind = await desks.findOne({ where: { id } });
    res.send({ msg: "Updated!", userFind });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createDesk,
  deleteDesk,
  getDesksByUserId,
  updateDesks,
  getDeskById,
  getDesksLikedByUserId,
  getHistoryDesks
};
