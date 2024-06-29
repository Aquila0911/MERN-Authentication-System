# MERN Authentication System

A full stack MERN (MongoDB, Express, React, Node.js) application which I developed during an internship at ***ThetaOne Software Developers Pvt.Ltd***. It incorporates authentication functionalities including JWTs, hashing, and user management.

## Features

- User Registration
- User Login
- JWT-based Authentication
- Password Hashing
- Details Page for Logged-in Users
- User Deletion
- Logout Functionality

## Technologies Used

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt for hashing, crypto for generating random sequence

## Packages Used

### Frontend

- **antd:** A comprehensive UI component library.
- **axios:** Promise-based HTTP client for the browser and node.js.
- **react-router-dom:** A library for routing in React applications.
- **react-transition-group:** Handling transitions and animations in React applications.
- **Tailwind CSS:** A utility-first CSS framework.
- **PostCSS:** A tool for transforming CSS with JavaScript plugins.
- **Autoprefixer:** A PostCSS plugin that automatically adds vendor prefixes to CSS rules.

### Backend
- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose:** MongoDB object modeling for Node.js.
- **dotenv:** A zero-dependency module that loads environment variables.
- **bcrypt:** A library to help hash passwords.
- **crypto:** For secure random number generation, used for tokens.
- **jsonwebtoken:** An implementation of JSON Web Tokens.
- **nodemon:** Monitors changes and automatically restarts the server.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aquila0911/MERN-Authentication-System.git
   cd MERN-Authentication-System
   ```

2. **Install Dependencies:**
   
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Setup .env file in backend:**  
   Create a `.env` file with
   ```env
   PORT = 5000
   ACCESS_TOKEN_SECRET= [Generate sequence using crypto]
   REFRESH_TOKEN_SECRET= [Generate sequence using crypto]
   ```

4. **Run the application:**
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd ../frontend
   npm run dev
   ```

### Usage

- **Register:** Create a new user account.
- **Login:** Authenticate using the registered credentials.
- **User Details:** View details of the logged-in user.
- **Logout:** Log out from the application.
- **User Deletion:** Delete current logged-in user account and logout.

## Acknowledgements

  Thanks to the people at ***ThetaOne Software Developers Pvt.Ltd.*** for their assistance with this project.

---
