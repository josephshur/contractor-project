'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Charity extends Model {

    static associate(models) {
      Charity.associate = function(models) {
        Charity.hasMany(models.Donation);
      };
    }
  };
  Charity.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Charity',
  });
  return Charity;
};
