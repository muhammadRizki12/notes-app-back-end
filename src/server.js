import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.use(
  cors({
    origin: 'https://notesapp-v1.dicodingacademy.com',
  })
);

app.use(express.json());
app.use('/', routes);

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
