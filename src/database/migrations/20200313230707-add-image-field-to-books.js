module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('books', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('books', 'avatar_id');
  },
};
