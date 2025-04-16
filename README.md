# MERN Authentication System

A full stack MERN (MongoDB, Express, React, Node.js) application which I developed during an internship at ***ThetaOne Software Developers Pvt.Ltd***. It incorporates authentication and authorization, custom react hooks, protected routes and user management.

## Features

- User Registration
- User Login/Logout Functionality
- Details Page for Logged-in Users
- User Deletion
- JWT-based Authentication
- Custom React Hook for Authorization
- Protected Routes
- Password Hashing

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
- **cors:** Middleware to enable Cross-Origin Resource Sharing.

## Deployment

The deployment of this project is split between two platforms to leverage their strengths for different parts of the application (also because they're free):

- **Frontend**: Deployed on [Vercel](https://vercel.com/), known for its ease of use and automatic scaling. The frontend interacts with the backend through a base URL specified in the `.env.local` file, which is set to the backend's URL hosted on Render.
- **Backend**: Hosted on [Render](https://render.com/), chosen for its simplicity in setting up Node.js applications. The backend connects to a MongoDB Atlas database, with the connection URI securely stored in the `.env` file.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (local or Atlas)

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
   PORT=5000
   ACCESS_TOKEN_SECRET=[Generate sequence using crypto]
   REFRESH_TOKEN_SECRET=[Generate sequence using crypto]
   MONGO_URI=[Your local or Atlas URI]
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
