import express from 'express';
import cors from 'cors';
import CryptoJS from 'crypto-js';

const PORT = 8080;
const app = express();
let database = { data: 'Hello World', hash: '' };

const computeHash = (data) => CryptoJS.SHA256(data).toString();

database.hash = computeHash(database.data);

app.use(cors());
app.use(express.json());

// Routes

app.get('/', (req, res) => {
  res.json(database);
});

app.post('/', (req, res) => {
  database.data = req.body.data;
  database.hash = computeHash(database.data);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
