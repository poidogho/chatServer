'use strict';
const config = require('../config/keys');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Chat, { foreignKey: 'chatId' });
    }
  }
  Message.init(
    {
      type: DataTypes.STRING,
      message: {
        type: DataTypes.TEXT,
        get() {
          const type = this.getDataValue('type');
          const id = this.getDataValue('chatId');
          const msg = this.getDataValue('message');

          return type === 'text'
            ? msg
            : `${config.appUrl}:${config.appPort}/chat/${id}/${msg}`;
        },
      },
      fromuserId: DataTypes.INTEGER,
      chatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
