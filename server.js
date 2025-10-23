import express from 'express';
import { handler } from './dist/server/entry.mjs';

const app = express();

// Tus endpoints custom si los tienes
app.use(handler);

const port = process.env.PORT || 4321;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
