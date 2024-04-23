'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solusi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Solusi.hasMany(models.Kuis,{foreignKey:'solusi_id'});
    }
  }
  Solusi.init({
    Solusi_Stress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Solusi',
  });
  return Solusi;
};