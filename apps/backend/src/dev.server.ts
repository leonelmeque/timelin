import express from 'express';
import todosRouter from './routes/todos';

const app = express();

app.use(express.json());

const PORT = 3002;

app.get('/', (_req, res) => {
  console.log('someone pinged here!!');
  res.send('Hello world');
});

app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
