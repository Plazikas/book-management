// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize the app and set the port
const app = express();
const port = 3000;

// Middleware to pares JSON
app.use(bodyParser.json());

// Route to server 'index.html' since the project root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize the temporarly database
const db = new sqlite3.Database(':memory:');

// Create the table books in the database
db.serialize(() => {
    db.run(`CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author VARCHAR(25) NOT NULL,
        title VARCHAR(40) NOT NULL,
        genre VARCHAR(20) NOT NULL,
        price REAL NOT NULL
    )`);
});

// Route to add a new book
app.post('/books', (req, res) => {
    const { author, title, genre, price } = req.body;

    const validateFields = (author, title, genre, price) => {
        if (!author) return 'Author is required';
        if (!title) return 'Title is required';
        if (!genre) return 'Genre is required';
        if (price == null || price === '') return 'Price is required';
        return null;
    };

    const validationError = validateFields(author, title, genre, price);
    if(validationError){
        return res.status(400).json({ message: validationError });
    }

    const stmt = db.prepare("INSERT INTO books (author, title, genre, price) VALUES (?, ?, ?, ?)");
    stmt.run(author, title, genre, price, function(err) {
        if (err) {
            res.status(500).json({ message: 'Failed to add book' });
        } else {
            res.json({ message: 'Book added successfully' });
        }
    });
    stmt.finalize();
});

// Route to find books by a keyword
app.get('/books/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    db.all(`SELECT * FROM books WHERE title LIKE ?`, [`%${keyword}%`], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Failed to retrieve books' });
        } else {
            res.json(rows);
        }
    });
});

// Initialize the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
