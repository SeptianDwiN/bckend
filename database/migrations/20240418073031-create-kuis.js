'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kuis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pertanyaan: {
        type: Sequelize.TEXT
      },
      jawaban_a: {
        type: Sequelize.TEXT
      },
      jawaban_b: {
        type: Sequelize.TEXT
      },
      jawaban_c: {
        type: Sequelize.TEXT
      },
      jawaban_d: {
        type: Sequelize.TEXT
      },
      jawaban_benar: {
        type: Sequelize.STRING
      },
      solusi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Solusis',
          key: 'id',
          onDelete: 'CASCADE'
        }
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
    await queryInterface.addIndex('Kuis',['solusi_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kuis');
    await queryInterface.dropTable('Solusis');
  }
};