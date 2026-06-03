'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Follow.init({
    followerNickname: {type:DataTypes.STRING, allowNull:false},
    followingNickname: {type:DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};