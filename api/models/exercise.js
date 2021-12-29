'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Exercise.belongsTo(models.Exercise_list, {
        foreignKey: 'id_exercise'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_01'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_02'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_03'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_04'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_05'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_06'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_07'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_08'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_09'
      })
      Exercise.hasMany(models.Week_day, {
        foreignKey: 'id_exercise_10'
      })
    }
  };
  Exercise.init({
    series: DataTypes.INTEGER,
    repetitions: DataTypes.INTEGER,
    load: DataTypes.INTEGER,
    method: DataTypes.STRING,
    interval: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Exercise',
    paranoid: true
  })
  return Exercise
}
