
# Bookstore MERN Project

## Overview

The **Bookstore MERN** project is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to browse, search, and purchase books online while providing an intuitive interface for managing book collections.

## Features

- User authentication (Sign up, Login, Logout)
- Browse books by categories and genres
- Search functionality
- Add books to cart and checkout
- Admin panel to manage books and orders
- Responsive design for better user experience

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Token (JWT)

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bookstore-mern.git
   cd bookstore-mern
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `server` folder and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
4. Start the backend server:
   ```bash
   cd server
   npm start
   ```
5. Start the frontend client:
   ```bash
   cd client
   npm start
   ```

## Folder Structure

```
bookstore-mern/
│-- src/
│   │-- components/    # Reusable UI components
│   │-- pages/         # Application pages
│   │-- assets/        # Images and static assets
│   │-- hooks/         # Custom React hooks
│   │-- context/       # Context API for global state
│   │-- utils/         # Utility functions
│-- routes/           # API endpoints
│-- models/           # Database models (MongoDB, Mongoose)
│-- controllers/      # Business logic
│-- middleware/       # Authentication & validation
│-- public/           # Static assets
│-- config/           # Configuration files
│-- .gitignore        # Ignored files list
│-- package.json      # Project dependencies
│-- README.md         # Documentation
```

## API Endpoints

- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book (Admin only)
- `GET /api/books/:id` - Get book details
- `POST /api/auth/login` - User login
- `POST /api/orders` - Place an order

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## Contact

For any queries or suggestions, reach out at (chakravartianushka23@gmail.com).

