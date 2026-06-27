🏡 Airbnb Clone (Node.js + Express + MongoDB)

A full-stack Airbnb-style web application built using Node.js, Express, and MongoDB.
This project demonstrates core backend concepts like authentication, CRUD operations, user roles, and MVC architecture.

🚀 Features
👤 User Authentication (Login / Signup)
🏠 Add Home Listings (Host functionality)
✏️ Edit Home Listings
🔍 Explore Available Homes
👥 Host & Guest Role System
📦 RESTful API structure (partially or fully depending on implementation)
🗄️ MongoDB database integration
🧩 MVC architecture (Model–View–Controller)
🛠️ Tech Stack
Node.js
Express.js
MongoDB + Mongoose
EJS (if used for views)
Express Sessions / JWT (if used)
Git & GitHub
📂 Project Structure
AIRBNB PROJECT/
│
├── airbnb/
│   ├── models/          # Database schemas
│   ├── routes/          # Express routes
│   ├── controllers/     # Business logic
│   ├── views/           # EJS templates (frontend rendering)
│   ├── public/          # Static files (CSS, JS, images)
│   └── app.js           # Main server file
│
├── package.json
└── README.md
⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/Student-Lavkush/NodeJs-Project.git
2. Navigate to project folder
cd NodeJs-Project/airbnb
3. Install dependencies
npm install
4. Start the server
npm start

or

node app.js
🌐 API / Routes Overview
Method	Route	Description
GET	/	Home page / Explore homes
GET	/login	Login page
GET	/signup	Signup page
POST	/login	Authenticate user
POST	/signup	Register user
GET	/homes	View all homes
POST	/add-home	Add new home
POST	/edit-home/:id	Edit home
👥 User Roles
🏠 Host
Add new homes
Edit existing homes
Manage listings
🔍 Guest
Explore homes
View listings
Book homes (if implemented)
📌 Concepts Learned
MVC architecture
RESTful routing
Authentication & authorization
MongoDB schema design
Session handling
Backend project structuring
🚀 Future Improvements
Convert to full REST API + frontend separation
Add JWT authentication
Add booking & payment system
Deploy on cloud (Render / Vercel / AWS)
Add React frontend (optional upgrade)
