# Portfolio & Blog API

A RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio website with blog functionality.

## Live Demo

- **API URL**: [Your deployed API URL]
- **Frontend URL**: [Your deployed frontend URL]

## Features

- User authentication with JWT
- Password hashing with bcrypt
- CRUD operations for Projects
- CRUD operations for Blog Posts
- Comment system for blog posts
- Contact form message handling
- Protected routes with authorization
- Error handling middleware

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcrypt.js
- Helmet (security)
- CORS

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Login and get JWT token | Public |
| GET | `/api/users/profile` | Get user profile | Protected |

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create new project | Protected |
| PUT | `/api/projects/:id` | Update project | Protected |
| DELETE | `/api/projects/:id` | Delete project | Protected |

### Blog Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create new blog post | Protected |
| PUT | `/api/blog/:id` | Update blog post (author only) | Protected |
| DELETE | `/api/blog/:id` | Delete blog post (author only) | Protected |

### Comments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Add comment to post | Protected |
| DELETE | `/api/blog/:postId/comments/:commentId` | Delete comment (author only) | Protected |

### Contact

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Send contact message | Public |
| GET | `/api/contact` | Get all messages | Protected |
| DELETE | `/api/contact/:id` | Delete message | Protected |

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd portfolio-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## Request Body Examples

### Register User
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Project
```json
{
  "title": "My Project",
  "description": "A description of my project",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/username/repo",
  "liveUrl": "https://myproject.com"
}
```

### Create Blog Post
```json
{
  "title": "My Blog Post",
  "content": "This is the content of my blog post..."
}
```

### Create Comment
```json
{
  "body": "Great post!"
}
```

### Send Contact Message
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch..."
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Deployment

This API is designed to be deployed on platforms like Render, Heroku, or Railway.

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables in the platform's dashboard
4. Deploy!

## License

MIT
