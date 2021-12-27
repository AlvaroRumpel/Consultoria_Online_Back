'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Week_days', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      week_day: {
        type: Sequelize.INTEGER
      },
      id_exercise_01: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_02: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_03: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_04: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_05: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_06: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_07: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_08: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_09: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
        }
      },
      id_exercise_10: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises', key: 'id'
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
    await queryInterface.dropTable('Week_days');
  }
};