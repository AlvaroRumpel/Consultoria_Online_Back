'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clients', 'role', { type: Sequelize.INTEGER })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clients', 'role')
  }
}
