'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clients.hasOne(models.Clients_forms, {
        foreignKey: 'id_client'
      });
      Clients.hasOne(models.Training_sheet, {
        foreignKey: 'id_Client'
      })
    }
  };
  Clients.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
        isAlphanumeric: true
      }
    },
    user: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 255],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255],
      }
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Clients',
    paranoid: true,
  });
  return Clients;
};