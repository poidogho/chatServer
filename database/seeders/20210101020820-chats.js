'use strict';

const models = require('../../models');
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = await User.findAll({ limit: 2 });
    const chat = await Chat.create();

    await ChatUser.bulkCreate([
      {
        chatId: chat.id,
        userId: users[0].id,
      },
      {
        chatId: chat.id,
        userId: users[1].id,
      },
    ]);

    await Message.bulkCreate([
      {
        message: 'How re u',
        chatId: chat.id,
        fromuserId: users[0].id,
      },
      {
        message: 'Im ok',
        chatId: chat.id,
        fromuserId: users[1].id,
      },
      {
        message: 'Its being a while',
        chatId: chat.id,
        fromuserId: users[1].id,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
