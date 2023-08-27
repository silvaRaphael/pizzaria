import 'dotenv/config';
import express from 'express';

import taskRoutes from './interfaces/routes/task-routes';
import userRoutes from './interfaces/routes/user-routes';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);
