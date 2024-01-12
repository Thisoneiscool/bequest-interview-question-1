import express from 'express';
import cors from 'cors';
import CryptoJS from 'crypto-js';

const PORT = 8080;
const app = express();

interface DataVersion {
  data: string;
  hash: string;
}

const database = {
  current: { data: 'Hello World', hash: '' },
  versions: [] as DataVersion[],
};

const computeHash = (data) => CryptoJS.SHA256(data).toString();

database.current.hash = computeHash(database.current.data);

app.use(cors());
app.use(express.json());

// Routes

app.get('/', (req, res) => {
  res.json(database);
});

app.post('/', (req, res) => {
  database.versions.push({ ...database.current });

  database.current.data = req.body.data;
  database.current.hash = computeHash(database.current.data);
  res.sendStatus(200);
});

app.get('/recover', (req, res) => {
  if (database.versions.length > 0) {
    res.json(database.versions[database.versions.length - 1] || {});
  } else {
    res.json({ message: 'No previous versions available' });
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
