'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients_forms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clients_forms.belongsTo(models.Clients, {
        foreignKey: 'id_client'
      });
      Clients_forms.belongsTo(models.Initial_Forms, {
        foreignKey: 'id_initial_form'
      });
    }
  };
  Clients_forms.init({
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Clients_forms',
  });
  return Clients_forms;
};