This document explains how AI tools (like ChatGPT / Gemini CLI) were used to build the Student App Backend project.

Each section contains:



The prompt (what I asked AI)



The AI response summary (not full text, only the useful part)



The implementation (how I used it in the project)



1).  Authentication System (JWT Login)



Prompt I gave AI:

"How can I create a JWT-based login system in Node.js using Express and SQLite?"



AI Response (Summary):



Install jsonwebtoken



Create /register and /login routes



On login, generate a JWT token with jwt.sign()



Protect routes using jwt.verify() middleware



Implementation:

I followed the instructions to add user registration and login routes. AI helped me set up JWT authentication, which I used to secure student CRUD APIs.



2). CRUD Operations (Students)



Prompt I gave AI:

"Give me a sample Express.js CRUD API with SQLite for a students table."



AI Response (Summary):



Create a SQLite DB with a students table (id, name, course, marks, isActive, GPA)



Implement routes:



POST /students (insert new student)



GET /students (list students)



PUT /students/:id (update student)



DELETE /students/:id (delete student)



Implementation:

I copied the structure and adapted it for my project. This became the backbone of the Student Management API.



3).  Pagination



Prompt I gave AI:

"How to implement pagination in Express with SQLite?"



AI Response (Summary):



Use LIMIT and OFFSET in SQL queries



Accept page and limit query parameters



Example: SELECT \* FROM students LIMIT 10 OFFSET (page-1)\*10;



Implementation:

I applied this logic in my GET /students API. Now the app returns 5–10 students per page.



4).  Search Functionality



Prompt I gave AI:

"How do I add search in SQLite queries for name, course, or ID?"



AI Response (Summary):



Use WHERE with LIKE operator



Example:



SELECT \* FROM students WHERE name LIKE '%keyword%' OR course LIKE '%keyword%';





Implementation:

I added query params like ?search=math to filter students by name, id, course, or marks.



5).  Sorting Students



Prompt I gave AI:

"Show me how to add sorting by name, marks, or GPA in Express + SQLite."



AI Response (Summary):



Accept a sortBy parameter (e.g., name, marks, gpa)



Accept order (ASC/DESC)



Add ORDER BY in SQL:



SELECT \* FROM students ORDER BY marks DESC;





Implementation:

I added sorting options to GET /students, so I can sort by GPA, marks, or name.



6).  Filtering Active/Inactive Students



Prompt I gave AI:

"How can I filter records in SQLite where isActive = true or false?"



AI Response (Summary):



Add a boolean column isActive



Use a query parameter ?active=true



SQL example:



SELECT \* FROM students WHERE isActive = 1;





Implementation:

I added filtering in the students API so I can view only active or inactive students.



7).  Deployment (Render Hosting)



Prompt I gave AI:

"How do I deploy a Node.js + SQLite backend on Render for free?"



AI Response (Summary):



Push code to GitHub



Create a new Render service



Add a start script in package.json



Set environment variables if needed



Render automatically builds and deploys



Implementation:

I followed this to deploy my project:

🔗 https://student-app-invn.onrender.com



&nbsp;Conclusion



AI helped me in all stages of development: authentication, CRUD, pagination, search, sorting, filtering, and deployment. Without AI guidance, I wouldn’t have been able to complete this project in a short time.

