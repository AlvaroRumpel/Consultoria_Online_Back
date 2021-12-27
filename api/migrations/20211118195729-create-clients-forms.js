'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients_forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_client: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients', key: 'id'
        }
      },
      id_initial_form: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Initial_Forms', key: 'id'
        }
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients_forms');
  }
};