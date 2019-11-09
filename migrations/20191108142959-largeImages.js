'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'mugs',
      'picture',
      {
        type: Sequelize.BLOB('medium')
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.changeColumn(
      'mugs',
      'picture',
      {
        type: Sequelize.BLOB
      }
    );
  }
};
