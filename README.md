# FastifyKit

A modern, lightweight starter kit for building web applications with Fastify and TypeScript.

## Features

- Fast and lightweight API with Fastify
- TypeScript for both backend and frontend
- MVC architecture pattern
- PostgreSQL database with TypeORM
- API documentation with Swagger/OpenAPI
- Static file serving
- Template rendering with EJS
- API endpoints with validation
- CORS support
- Environment configuration
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/fastifykit.git
   cd fastifykit
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   ```
   cp .env.example .env
   ```
   
   Then edit the `.env` file with your database credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=fastifykit_db
   DB_SYNC=1  # Set to 1 to enable auto-sync of database schema (for development only)
   ```

4. Create the database (if it doesn't exist)
   ```
   createdb fastifykit_db
   ```

5. Build the project
   ```
   npm run build
   npm run build:client
   ```

6. Start development server
   ```
   npm run dev
   ```

7. For production
   ```
   npm start
   ```

## API Documentation

The API documentation is automatically generated using Swagger/OpenAPI. When the server is running, you can access the interactive documentation at:

```
http://localhost:3000/documentation
```

The documentation includes:
- All available endpoints
- Request/response schemas
- Example requests and responses
- The ability to try out API calls directly from the UI

## Project Structure

```
fastifykit/
├── src/                  # Source files
│   ├── config/           # Configuration files
│   ├── database/         # Database related files
│   │   ├── entities/     # TypeORM entities
│   │   ├── migrations/   # Database migrations
│   │   └── config.ts     # Database configuration
│   ├── controllers/      # Route controllers
│   ├── plugins/          # Fastify plugins
│   ├── routes/           # Route definitions
│   ├── schemas/          # API schemas for validation and documentation
│   ├── services/         # Business logic
│   ├── views/            # EJS templates
│   ├── public/           # Static assets
│   │   ├── css/          # CSS files
│   │   ├── js/           # Compiled JavaScript (from TypeScript)
│   │   └── ts/           # TypeScript source files
│   └── index.ts          # Application entry point
├── dist/                 # Compiled JavaScript output
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project metadata
├── tsconfig.json         # TypeScript configuration for server
├── tsconfig.client.json  # TypeScript configuration for client
└── README.md             # Project documentation
```

## API Endpoints

- `GET /api` - API info
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

For detailed API documentation, refer to the Swagger UI at `/documentation`.

## Database

The project uses TypeORM with PostgreSQL. Entity definitions are located in `src/database/entities/`. 

To create a new entity:
1. Define the entity class in `src/database/entities/`
2. Make sure it's included in the entity list in `src/database/config.ts`

With `DB_SYNC=1` in development, database schema will be automatically created/updated.

## License

This project is licensed under the MIT License - see the LICENSE file for details. # fastify-startkit
