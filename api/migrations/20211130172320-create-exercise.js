'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      series: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      repetitions: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      load: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      method: {
        allowNull: false,
        type: Sequelize.STRING
      },
      interval: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_exercise: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercise_lists', key: 'id'
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
    await queryInterface.dropTable('Exercises');
  }
};