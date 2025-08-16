const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// serve /public as a tiny UI
app.use(express.static(path.join(__dirname, "public")));

const SECRET = "mysecret";

// Database setup
const db = new sqlite3.Database("./students.db");
db.run(`CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);
db.run(`CREATE TABLE IF NOT EXISTS students(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  course TEXT,
  active BOOLEAN,
  marks1 INTEGER,
  marks2 INTEGER
)`);

// JWT auth
function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token" });
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run("INSERT INTO users(username,password) VALUES(?,?)", [username, hashed], (err) => {
    if (err) return res.status(400).json({ error: "User exists" });
    res.json({ success: true });
  });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username=?", [username], async (err, user) => {
    if (!user) return res.status(400).json({ error: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });
    const token = jwt.sign({ id: user.id }, SECRET);
    res.json({ token });
  });
});

// Create
app.post("/students", auth, (req, res) => {
  const { name, course, active, marks1, marks2 } = req.body;
  db.run(
    "INSERT INTO students(name,course,active,marks1,marks2) VALUES(?,?,?,?,?)",
    [name, course, active, marks1, marks2],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Read (filters + search + ranges + sort + pagination)
app.get("/students", auth, (req, res) => {
  const {
    page = 1,
    limit = 5,
    course,
    search,
    id,
    minMarks,
    maxMarks,
    minGpa,
    maxGpa,
    sort = "id",
    order = "asc",
  } = req.query;

  const offset = (page - 1) * limit;
  let query = "SELECT *, (marks1+marks2)/2 as gpa FROM students";
  let params = [];
  let conditions = [];

  if (course) {
    conditions.push("course=?");
    params.push(course);
  }
  if (search) {
    conditions.push("name LIKE ?");
    params.push(`%${search}%`);
  }
  if (id) {
    conditions.push("id=?");
    params.push(parseInt(id));
  }
  if (minMarks) {
    conditions.push("(marks1 + marks2) >= ?");
    params.push(parseInt(minMarks));
  }
  if (maxMarks) {
    conditions.push("(marks1 + marks2) <= ?");
    params.push(parseInt(maxMarks));
  }
  if (minGpa) {
    conditions.push("((marks1+marks2)/2) >= ?");
    params.push(parseFloat(minGpa));
  }
  if (maxGpa) {
    conditions.push("((marks1+marks2)/2) <= ?");
    params.push(parseFloat(maxGpa));
  }
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const allowedSortFields = ["id", "name", "course", "gpa", "marks1", "marks2"];
  const safeSort = allowedSortFields.includes(sort) ? sort : "id";
  const safeOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";
  query += ` ORDER BY ${safeSort} ${safeOrder}`;

  query += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  db.all(query, params, (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Update
app.put("/students/:id", auth, (req, res) => {
  const { name, course, active, marks1, marks2 } = req.body;
  db.run(
    "UPDATE students SET name=?, course=?, active=?, marks1=?, marks2=? WHERE id=?",
    [name, course, active, marks1, marks2, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Delete
app.delete("/students/:id", auth, (req, res) => {
  db.run("DELETE FROM students WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
