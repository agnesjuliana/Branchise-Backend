'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  customer.init({
    id_customer: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
    tableName: "customer"
  });
  return customer;
};