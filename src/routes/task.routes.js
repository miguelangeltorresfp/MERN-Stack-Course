const express = require('express');

const router = express.Router();

const Task = require('../models/task');

/* SOLICITA TODAS LAS TAREAS */
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

/* SOLICITA UNA ÚNICA TAREA */
router.get('/:id', async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });
  res.json(task);
});

/* GUARDAR TAREA */
// Los datos que envía el navegador siempre van a estar dentro de un objeto llamado requeste
// Al usar el módulo express.json tenemos una propiedad llamada 'body'
router.post('/', async (req, res) => {
  console.log('req.params: ', req.params);
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.json({ status: 'Task Saved' });
});

/* ACTUALIZAR TAREA */
router.put('/:id', async (req, res) => {
  console.log('req.params._id: ', req.params.id);
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: 'Task Updated' });
});

/* ELIMINAR TAREA */
router.delete('/:id', async (req, res) => {
  await Task.findOneAndRemove(req.params.id);
  res.json({ status: 'Task Deleted' });
});

module.exports = router;
