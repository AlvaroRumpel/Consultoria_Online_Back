'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_Client: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients', key: 'id'
        }
      },
      key: {
        type: Sequelize.STRING
      },
      valid: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens')
  }
}
