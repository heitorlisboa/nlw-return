import express from 'express';
import { router } from './router';

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
