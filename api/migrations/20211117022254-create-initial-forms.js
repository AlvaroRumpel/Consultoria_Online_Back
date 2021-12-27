'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Initial_Forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_01: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      question_02: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      question_03: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_04: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      question_05: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_06: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      question_07: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_08: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      question_09: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      question_10: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Initial_Forms');
  }
};