'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clients', 'checkedEmail', { type: Sequelize.BOOLEAN })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clients', 'checkedEmail')
  }
}
