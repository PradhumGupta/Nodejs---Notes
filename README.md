# Notes App

A full-stack note-taking application built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**
  - Secure login and registration
  - Session management with Passport.js
  - Protected routes

- **Note Management**
  - Create, Read, Update, Delete (CRUD) operations
  - Rich text editing
  - Search functionality
  - Pagination system

- **User Interface**
  - Responsive design
  - Custom dashboard
  - Modern UI with Bootstrap
  - Custom theme with CSS variables
  - SVG illustrations

## Tech Stack

- **Frontend:**
  - EJS templating
  - Bootstrap 5
  - Custom CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Passport.js

## Installation

```bash
# Clone the repository
git clone [your-repo-link]

# Install dependencies
npm install

# Create .env file and add your environment variables
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_google_callback_url

# Start the application
npm start
```

## Project Structure

```
├── public/
│   ├── css/
│   ├── img/
│   └── js/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── config/
├── views/
│   ├── layouts/
│   └── partials/
├── app.js
└── package.json
```

## Security Features

- Password hashing
- Protected routes
- User data isolation
- Input sanitization

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.