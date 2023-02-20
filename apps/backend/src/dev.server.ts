import express from 'express';

import todosRouter from './routes/todos.route';
import timelineRouter from './routes/timeline.route';
import { logger } from './middleware/logger';

const app = express();

app.use(express.json());

const PORT = 3002;

app.use(logger);
app.use('/api/todos', todosRouter);
app.use('/api/timeline', timelineRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
