'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Chat, { foreignKey: 'chatId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  ChatUser.init(
    {
      userId: DataTypes.INTEGER,
      chatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ChatUser',
    }
  );
  return ChatUser;
};
