# Book Management Application

## Overview
The Book Management Application is a simple web-based system designed to manage books. It includes a fronted interface for users to add and search for books, and a backend server that handles the data storage and retrieval using SQLite.

## Features
- Add new books with author, genre, and price information.
- Search for books by keyword.
- Simple and intuitive user interface.

## Project Structure
```bash
book-management/
├── client.html
├── server.js
├── package.json
```

## Prerequisites
- Node.js
- npm (Node Package Manager)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/plazikas/book-management.git
    cd book-management
    ```

2. Install the necessary dependencies:
    ```sh 
    npm install
    ```

## Usage
1. Start the server: 
    ```sh
    npm start
    ```
2. Open 'http://localhost:3000' in your web browser to interact with the application.

## Files description

### 'index.html'
This file contains the fronted of the application. It provides a form for adding new books and another form for searching books. It uses basic HTML and CSS for structure and sytling, and JavaScript for functionality.

#### Adding a Book
- Enter the author, title, genre, and price.
- Click on "Add Book" to save the book in the database.

#### Searching a Book
- Enter a keyword to search for books.
- Click on "Search" to find books matching the keyword.

### 'server.js'
This file contains the backend of the application. It sets up an Express server that interacts with an SQLite database to store and retrieve book data.

#### API Endpoints 
- 'POST '/books/' - Add a new book to the database.
- 'GET' /books/:keyword - Search for booksby keyword.

### 'package.json'
This file contains the metadata for the project and the list of dependencies. Key dependencies include Express for server setup, body-parser for parsing request bodies, cors for handling cross-oringin requests, and sqlite3 for database management.

## Author
P. Plazas

## License 
This project is licensed under the ISC License.

