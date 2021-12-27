'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Initial_Forms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Initial_Forms.belongsTo(models.Clients, {
        foreignKey: 'id_Client'
      });
    }
  };
  Initial_Forms.init({
    question_01: {
      type: DataTypes.BOOLEAN,
    },
    question_02: {
      type: DataTypes.TEXT,
    },
    question_03: DataTypes.STRING,
    question_04: DataTypes.TEXT,
    question_05: DataTypes.STRING,
    question_06: DataTypes.BOOLEAN,
    question_07: DataTypes.STRING,
    question_08: DataTypes.INTEGER,
    question_09: DataTypes.INTEGER,
    question_10: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Initial_Forms',
    paranoid: true
  });
  return Initial_Forms;
};