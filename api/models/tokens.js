'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      tokens.belongsTo(models.Clients, {
        foreignKey: 'id_Client'
      })
    }
  }
  tokens.init({
    key: DataTypes.STRING,
    valid: DataTypes.BOOLEAN,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tokens'
  })
  return tokens
}
