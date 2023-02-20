import 'colors';
import express from 'express';
import * as todoServices from '../services/todos.service';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = todoServices.getTodos();
  res.status(200).send(data);
});

router.get('/find/:id', (req, res) => {
  const data = todoServices.getTodoById(req.params.id);

  res.send({
    result: data,
  });
});

router.get('/all', (req, res) => {
  const arr = (req.query.ids as string).replace(' ', '').split(/,/g);

  const data = todoServices.getAllTodosById(arr);

  res.status(200).send({
    message: 'List of all todos',
    result: data || [],
  });
});

router.post('/save', (req, res) => {
  todoServices.saveTodo(req.body);

  res.status(200).send({
    message: 'Todo saved!',
    todo: req.body,
  });
});

router.put('/update/:id', (req, res) => {
  const data = todoServices.updateTodos(req.params.id, req.body);

  res.status(200).send({
    message: 'Todo has been updated!',
    todo: data,
  });
});

router.delete('/remove/:id', (req, res) => {
  todoServices.deleteTodo(req.params.id);

  res.status(200).send({
    message: 'Todo removed!',
  });
});

export default router;
