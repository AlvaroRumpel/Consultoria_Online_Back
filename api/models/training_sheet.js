'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Training_sheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Training_sheet.belongsTo(models.Clients, {
        foreignKey: 'id_client'
      })
      Training_sheet.belongsTo(models.Week_day, {
        foreignKey: 'id_week_day_01'
      })
      Training_sheet.belongsTo(models.Week_day, {
        foreignKey: 'id_week_day_02'
      })
      Training_sheet.belongsTo(models.Week_day, {
        foreignKey: 'id_week_day_03'
      })
      Training_sheet.belongsTo(models.Week_day, {
        foreignKey: 'id_week_day_04'
      })
      Training_sheet.belongsTo(models.Week_day, {
        foreignKey: 'id_week_day_05'
      })
      Training_sheet.belongsTo(models.Week_day, {
        foreignKey: 'id_week_day_06'
      })
    }
  };
  Training_sheet.init({
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Training_sheet',
    paranoid: true
  });
  return Training_sheet;
};