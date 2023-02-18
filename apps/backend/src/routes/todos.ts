import express from 'express';
import * as todoServices from '../services/todos';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Getting all todos');
  const data = todoServices.getTodos();
  res.send(data);
});

router.get('/:id', (req, res) => {
  console.log(`${req.url}`);
  const data = todoServices.getTodoById(req.params.id);
  res.send({
    result: data,
  });
});

router.post('/:id', (req, res) => {
  console.log(`${req.url}`);
  todoServices.saveTodo(req.body);
  res.status(200).send({
    message: 'Todo saved!',
    todo: req.body,
  });
});

router.put('/:id', (req, res) => {
  console.log(`${req.url}`);
  todoServices.updateTodos(req.params.id, req.body);
  res.status(200).send({
    message: 'Todo saved!',
    todo: req.body,
  });
});

router.delete('/:id', (req, res) => {
  console.log(`DELETED ${req.url}`);

  todoServices.deleteTodo(req.params.id);

  res.status(200).send({
    message: 'Todo removed!',
  });
});

export default router;
