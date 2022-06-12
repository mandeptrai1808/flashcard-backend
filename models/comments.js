'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({desks}) {
      // define association here
      this.belongsTo(desks, {foreignKey: "deskId"})
    }
  }
  comments.init({
    content: DataTypes.STRING,
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    deskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};