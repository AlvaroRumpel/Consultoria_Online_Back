'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Training_sheets', {
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
      id_week_day_01: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Week_days', key: 'id'
        }
      },
      id_week_day_02: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Week_days', key: 'id'
        }
      },
      id_week_day_03: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Week_days', key: 'id'
        }
      },
      id_week_day_04: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Week_days', key: 'id'
        }
      },
      id_week_day_05: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Week_days', key: 'id'
        }
      },
      id_week_day_06: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Week_days', key: 'id'
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Training_sheets')
  }
}
