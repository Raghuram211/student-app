\# 🏗️ System Architecture



\## 1. Overview

The \*\*Student Management Backend\*\* follows a simple \*\*Client–Server\*\* architecture with:

\- \*\*Backend (Server)\*\* → Node.js + Express

\- \*\*Database\*\* → SQLite (lightweight file-based database)

\- \*\*Hosting\*\* → Render (free cloud hosting for web services)



---



\## 2. Architecture Diagram

Client (Browser / Postman)

|

v

\[ Express Server ]

|

v

\[ SQLite Database ]





---



\## 3. Flow of Requests

1\. User registers or logs in → JWT token is generated.

2\. For protected routes (like `/students`), client must send `Authorization` header with the token.

3\. Server validates token → allows or denies access.

4\. CRUD operations happen on the \*\*students\*\* table.

5\. Response (JSON) is sent back to the client.



---



\## 4. Key Components

\- \*\*Express.js\*\* → Handles HTTP requests/responses.

\- \*\*SQLite\*\* → Stores users \& students.

\- \*\*JWT\*\* → Provides authentication and authorization.

\- \*\*CORS\*\* → Allows frontend or other apps to talk to backend.

\- \*\*bcrypt\*\* → Secures passwords with hashing.



---



\## 5. Deployment Notes

\- Local Development: `http://localhost:5000`

\- Production (Render): \[https://student-app-invn.onrender.com](https://student-app-invn.onrender.com)



