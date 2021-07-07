'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class founder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  founder.init({
    id_founder: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    nik: DataTypes.STRING,
    npwp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'founder',
    tableName: "founder"
  });
  return founder;
};