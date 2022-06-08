'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({desks}) {
      // define association hre
      this.belongsTo(desks, {foreignKey: "deskId"})
    }
  }
  cards.init({
    frontContent: DataTypes.STRING,
    backContent: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    deskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cards',
  });
  return cards;
};