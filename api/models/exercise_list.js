'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise_list.hasOne(models.Exercise, {
        foreignKey: 'id_exercise'
      })
    }
  };
  Exercise_list.init({
    exercise: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 255]
      }
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Exercise_list',
    paranoid: true
  });
  return Exercise_list;
};