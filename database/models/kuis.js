'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kuis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kuis.belongsTo(models.Solusi, {foreignKey: 'solusi_id'});
    }
  }
  Kuis.init({
    pertanyaan: DataTypes.TEXT,
    jawaban_a: DataTypes.TEXT,
    jawaban_b: DataTypes.TEXT,
    jawaban_c: DataTypes.TEXT,
    jawaban_d: DataTypes.TEXT,
    jawaban_benar: DataTypes.STRING,
    solusi_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kuis',
  });
  return Kuis;
};