'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      this.belongsTo(users, {foreignKey: "userId"})
    }
  }
  history.init({
    userId: DataTypes.INTEGER,
    deskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};