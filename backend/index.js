import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json()); // Return JSON data using the API server postman
app.use(cors());

console.log("🚀 Backend is starting...");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "mysql-db.cdegrojvvejq.us-east-1.rds.amazonaws.com",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "164450zsq",
    database: process.env.DB_NAME || "test",
    port: process.env.DB_PORT || 3306,
});

console.log("🛠 Attempting to connect to MySQL...");
function connectWithRetry() {
    db.connect(err => {
        if (err) {
            console.error("❌ Database connection failed: ", err);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log("✅ Connected to MySQL database!");
        }
    });
}
connectWithRetry();

app.get("/", (req, res) => {
    res.json("Hello World from the backend!!!");
});

// GET /books
app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";
    db.query(query, (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed", details: err });
        }
        return res.json(data);
    });
});

// POST /books
app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Book has been created successfully!!!");
    });
});

// DELETE /books/:id
app.delete("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";

    db.query(query, [bookID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Book has been deleted successfully!!!");
    });
});

// PUT /books/:id
app.put("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const query = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ];

    db.query(query, [...values, bookID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Book has been updated successfully!!!");
    });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on ${PORT}, Connect to the backend!!!!`);
});
