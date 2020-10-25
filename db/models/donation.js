'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {

    static associate(models) {
      Donation.associate = function(models) {
        Donation.belongsTo(models.Charity); // EventId
      };
    }
  };
  Donation.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};
