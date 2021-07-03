'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('business', {
      id_business: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_business: {
        type: Sequelize.STRING
      },
      id_founder: {
        type: Sequelize.INTEGER,
        references: {
          model: "founder",
          key: "id_founder"
        }
      },
      nib: {
        type: Sequelize.STRING
      },
      haki: {
        type: Sequelize.STRING
      },
      bpom: {
        type: Sequelize.STRING
      },
      stpw: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('business');
  }
};