# 📚 Library Management System (LMS)

## Overview
The **Library Management System (LMS)** is a comprehensive web application designed to streamline library resource management, enhance the user experience, and improve the effective administration of library resources and services. The system is built using modern web technologies, ensuring scalability, maintainability, and a user-friendly interface for both library personnel and consumers.

## Key Features
- **User and Admin Dashboards**: Separate dashboards for users and administrators to manage library resources efficiently.
- **Book Management**: Add, update, delete, and borrow books with real-time updates.
- **Authentication**: Secure login and signup functionality with JWT-based authentication.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **Theming**: Light and dark mode support with customizable themes.
- **Analytics**: Visualize book statistics and user activities using charts.

## Technologies Used

### Frontend
- **Framework**: React
- **State Management**: Redux
- **Styling**: CSS, Tailwind CSS, Material UI
- **Data Fetching**: GraphQL
- **Routing**: React Router

### Backend
- **Framework**: Node.js
- **API**: RESTful API & GraphQL
- **Database**: MongoDB
- **Authentication**: JWT Token

### DevOps & Tools
- **Version Control**: Git
- **Project Management**: Jira
- **Deployment**: Vercel
- **Testing**: Jest, ViteTest Framework

## Project Structure
├── backend 
│ ├── models 
│ ├── resolvers 
│ ├── schemas 
| ├── .env 
│ └── server.js 
├── frontend 
│ ├── src 
│ │ ├── components 
│ │ ├── pages 
│ │ ├── redux 
│ │ ├── styles 
│ │ └── App.js 
├── package.json 
└── README.md

## Installation

### Prerequisites
- Node.js (v16.x or later)
- MongoDB (v4.x or later)

### Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/thanmaisai/HyperBooks/
    cd HyperBooks
    ```

2. **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```

3. **Frontend Setup**:
    ```bash
    cd library-management-system
    npm install
    ```

4. **Environment Variables**: Create a `.env` file in the `backend` directory with the following variables:
    ```plaintext
    MONGO_URI=<your_mongo_db_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

5. **Running the Application**:
    - Start the backend server:
      ```bash
      npm run dev
      ```
    - Start the frontend:
      ```bash
      npm start
      ```

6. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

### User Roles
- **Admin**: Full control over the library system, including book management, user management, and system configuration.
- **User**: Can browse books, borrow books, and manage their profile.

### Core Components
- **Home**: Landing page with an overview of the system's features.
- **Login & Signup**: Secure authentication pages.
- **Admin Dashboard**: Overview of book statistics and user management.
- **User Dashboard**: Displays borrowed books and provides a personalized experience.
- **Book Management**: Add, edit, delete, and borrow books.

### GraphQL Endpoints
- **Queries**:
  - `users`: Fetch all users.
  - `books`: Fetch all books.
- **Mutations**:
  - `signupUser`: Create a new user.
  - `addBook`: Add a new book.
  - `borrowBook`: Borrow a book.

## Testing
- **Unit Testing**: Run the test suite using Jest and ViteTest Framework:
  ```bash
  npm run test
- **GraphQL Testing**: Use GraphQL Playground to test queries and mutations.
