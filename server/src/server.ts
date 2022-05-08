import express from 'express';
import cors from 'cors';
import { router } from './router';

const app = express();
const PORT = process.env.PORT ?? 4000;

// TODO: Change cors origin to the website address when it is hosted
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
