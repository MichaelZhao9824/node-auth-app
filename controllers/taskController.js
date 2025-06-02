const taskService = require('../services/taskService');

async function getTasks(req, res) {
  const tasks = await taskService.getUserTasks(req.user.id);
  res.json(tasks);
}

async function createTask(req, res) {
  const { title, description } = req.body;
  const task = await taskService.createUserTask(req.user.id, title, description);
  res.status(201).json(task);
}

module.exports = { getTasks, createTask };