'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Week_day extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_01'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_02'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_03'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_04'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_05'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_06'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_07'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_08'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_09'
      })
      Week_day.belongsTo(models.Exercise, {
        foreignKey: 'id_exercise_10'
      })
      Week_day.hasMany(models.Training_sheet, {
        foreignKey: 'id_week_day_01'
      })
      Week_day.hasMany(models.Training_sheet, {
        foreignKey: 'id_week_day_02'
      })
      Week_day.hasMany(models.Training_sheet, {
        foreignKey: 'id_week_day_03'
      })
      Week_day.hasMany(models.Training_sheet, {
        foreignKey: 'id_week_day_04'
      })
      Week_day.hasMany(models.Training_sheet, {
        foreignKey: 'id_week_day_05'
      })
      Week_day.hasMany(models.Training_sheet, {
        foreignKey: 'id_week_day_06'
      })
    }
  };
  Week_day.init({
    week_day: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Week_day',
    paranoid: true
  })
  return Week_day
}
