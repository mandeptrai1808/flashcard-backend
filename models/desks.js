'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class desks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, cards, likes, rates}) {
      // define association here
      this.belongsTo(users, {foreignKey: "userId"});
      this.hasMany(cards, {foreignKey: "deskId"});
      this.hasMany(likes, {foreignKey: "deskId"});
      this.hasMany(rates, {foreignKey: "deskId"});
    }
  }
  desks.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'desks',
  });
  return desks;
};