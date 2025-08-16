\# Student App Backend



\## 📖 Overview

This project is a \*\*Student Management Backend\*\* built using:

\- Node.js + Express

\- SQLite database

\- JWT Authentication



🔗 Live Project: \[https://student-app-invn.onrender.com](https://student-app-invn.onrender.com)



---



\## ⚙️ Features

\- User Registration \& Login

\- JWT Token Authentication

\- Add, Update, Delete Students

\- List Students with:

&nbsp; - Pagination

&nbsp; - Search (by name, id, course, marks)

&nbsp; - Sorting (by GPA, marks, name)

&nbsp; - Filtering (active/inactive, course, marks range)



---



\## 🔗 API Endpoints

\### Authentication

\- `POST /register` → Register new user

\- `POST /login` → Login and get token



\### Students (Need JWT Token in header)

\- `POST /students` → Add student

\- `GET /students` → List students (supports pagination, search, filter, sort)

\- `PUT /students/:id` → Update student

\- `DELETE /students/:id` → Delete student



---



\## 🚀 Run Locally

```bash

cd backend

npm install

node server.js



