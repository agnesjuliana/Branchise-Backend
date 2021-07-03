'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.founder, {
        foreignKey: "id_founder",
        as: "founder"
      })
    }
  };
  business.init({
    id_business: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name_business: DataTypes.STRING,
    id_founder: DataTypes.STRING,
    nib: DataTypes.STRING,
    haki: DataTypes.STRING,
    bpom: DataTypes.STRING,
    stpw: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'business',
    tableName: "business"
  });
  return business;
};