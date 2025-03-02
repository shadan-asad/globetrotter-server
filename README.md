# Globetrotter - Geography Learning Game

Globetrotter is a geography learning game that challenges users to identify cities around the world based on clues. The application provides an interactive way to learn about different destinations, with fun facts and trivia about each location.

### Live Url for APIs: https://globetrotter-server-production.up.railway.app/api
### Frontend: https://github.com/shadan-asad/globetrotter-client

## Project Overview

This repository contains the backend server for the Globetrotter application, built with Node.js, Express, TypeScript, and MongoDB. The server provides RESTful API endpoints for:

- User authentication and management
- Game mechanics (questions and answers)
- Destination information

## Features

- **User Management**: Register, login, and profile management
- **Game Mechanics**: Random geography questions with multiple-choice answers
- **Statistics Tracking**: Track user performance and game history
- **API Documentation**: Swagger UI for easy API exploration

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI
- **Development Tools**: Nodemon, ts-node

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local instance or connection string to MongoDB Atlas)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/globetrotter-server.git
   cd globetrotter-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

```
npm run dev
```

The server will start on the port specified in your `.env` file (default: 5001).

### Production Mode

To build and run the application in production mode:

```
npm run build
npm start
```

### Seeding the Database

To populate the database with initial destination data:

```
npm run seed
```

### Testing Database Connection

To test your MongoDB connection:

```
npm run test-db
```

## API Documentation

Once the server is running, you can access the Swagger UI documentation at:

```
http://localhost:5001/api-docs
```

This provides an interactive interface to explore and test all available API endpoints.

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token
- `GET /api/users/profile` - Get user profile (requires authentication)
- `PUT /api/users/profile` - Update user profile (requires authentication)

### Game Routes
- `GET /api/game/question` - Get a random game question
- `POST /api/game/answer` - Submit an answer and get feedback

### Destination Routes
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get a specific destination
- `POST /api/destinations` - Create a new destination (admin only)
- `PUT /api/destinations/:id` - Update a destination (admin only)
- `DELETE /api/destinations/:id` - Delete a destination (admin only)

## Project Structure

```
globetrotter-server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── .env                # Environment variables
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── swagger.yaml        # API documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 
