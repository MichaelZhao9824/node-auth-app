const express = require('express');
const { Task } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.findAll({ where: { UserId: req.user.id } });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, UserId: req.user.id });
  res.status(201).json(task);
});

module.exports = router;