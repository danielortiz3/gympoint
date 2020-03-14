import Sequelize, { Model } from 'sequelize';

class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        isbn: Sequelize.STRING,
        category: Sequelize.STRING,
        year: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // Relaciona avatar_id
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Book;
