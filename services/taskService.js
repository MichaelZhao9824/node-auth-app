const { Task } = require('../models');

async function getUserTasks(userId) {
  return await Task.findAll({ where: { UserId: userId } });
}

async function createUserTask(userId, title, description) {
  return await Task.create({ title, description, UserId: userId });
}

module.exports = { getUserTasks, createUserTask };