import express from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import cors from 'cors'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'contactData.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the table for storing contact data if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS contact_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    contact TEXT,
    message TEXT NOT NULL
  )
`);

app.post('/submit-contact', (req, res) => {
  const { name, email, contact, message } = req.body;

  // Validate the form data
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Insert the form data into the database
  db.run(
    'INSERT INTO contact_data (name, email, contact, message) VALUES (?, ?, ?, ?)',
    [name, email, contact, message],
    function (err) {
      if (err) {
        console.error('Error inserting data into database:', err.message);
        return res.status(500).json({ error: 'Failed to save contact data.' });
      }
      res.status(200).json({ message: 'Contact data saved successfully!', id: this.lastID });
    }
  );
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
