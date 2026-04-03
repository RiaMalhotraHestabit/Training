# Backend Architecture

This project follows a layered Node.js architecture.

## Layers
- Routes: HTTP entry points
- Controllers: Request/Response handling
- Services: Business logic
- Repositories: Database access
- Models: Data schemas

## Loaders
- app.js: Loads Express, middlewares, DB, routes
- db.js: Database initialization

## Config
Environment-based configuration using dotenv.

## Logging
Centralized logging using Winston with file persistence.

## Project Structure

src/
- config/        → Environment & application configuration
- loaders/       → Application bootstrapping logic
- routes/        → Route definitions (HTTP endpoints)
- controllers/   → Request & response handling
- services/      → Business logic layer
- repositories/  → Database interaction layer
- models/        → Database schemas
- middlewares/   → Express middlewares
- utils/         → Shared utilities (logger, helpers)
- logs/          → Application log files

## Application Startup Flow

1. Entry point (`src/index.js`) starts the application
2. App loader initializes Express
3. Middlewares are registered
4. Database connection is established
5. Routes are mounted
6. Server starts listening on the configured port
