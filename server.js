import express from 'express';
import { handler } from './dist/server/entry.mjs'; // generado por astro build con @astrojs/node
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Tus endpoints custom
// Ejemplo:
// app.post('/api/custom', (req, res) => {
//   res.json({ message: 'Custom endpoint works!' });
// });

// Integración con Astro SSR
app.use(handler);

// Escucha en el puerto que Render asigna
const port = process.env.PORT || 4321;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
