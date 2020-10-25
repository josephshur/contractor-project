//migration

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Donations', 'CharityId', Sequelize.INTEGER).then(() => {
      return queryInterface.addConstraint('Donations', ['CharityId'], {
        type: 'foreign key',
        name: 'charity_donations',
        references: {
          table: 'Charities',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Donations', 'CharityId');
  }
};
