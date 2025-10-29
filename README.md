# User Directory API

> A small, production-ready REST API for managing a simple in-memory user directory built with Express.

## Table of contents

- About
- Features
- Requirements
- Installation
- Environment
- Scripts
- API Endpoints
- Request examples
- Validation & error handling
- Logging
- Contributing
- License

## About

This repository contains a lightweight Node.js/Express API that allows clients to create, read, update and delete users stored in an in-memory array. It's intended as a simple exercise or starting point for a microservice that manages user records.

## Features

- GET /api/v1/ - simple health route on app root
- CRUD operations for users (GET, GET by id, POST, PUT, DELETE)
- Request validation using `express-validator`
- Centralized error handling middleware
- Simple request logging middleware

## Requirements

- Node.js (v16+ recommended)
- npm (or yarn)

## Installation

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd btask2
npm install
```

## Environment

The app reads the optional `PORT` value from environment variables. Create a `.env` file in the project root if you want to override the default port (3030).

Example `.env`:

```
PORT=4000
```

## Scripts

- `npm start` - (not defined here). To run the server locally use `node server.js` or run the app with nodemon if installed globally: `nodemon server.js`.

The project uses ES modules (`type: "module"`) and the main entry is `server.js` which imports `app.js`.

## How to run

Start the server:

```bash
node server.js
```

If `PORT` is not set, the server runs on `http://localhost:3030` by default.

## API Endpoints

Base URL: `/api/v1/`

- GET `/api/v1/` — base route on the router returns all users.
- GET `/api/v1/:id` — returns a single user by id.
- POST `/api/v1/` — create a new user. Body must include `name` and `role`.
- PUT `/api/v1/:id` — update an existing user's `name` and `role`.
- DELETE `/api/v1/:id` — delete a user.

Notes:

- The API stores users in-memory in `user.js` (array `users`). Data is not persistent — restarting the server resets the users list.

## Request examples

Create a user (POST):

```bash
curl -X POST http://localhost:3030/api/v1/ \
	-H "Content-Type: application/json" \
	-d '{"name":"Alice","role":"devops"}'
```

Get all users:

```bash
curl http://localhost:3030/api/v1/
```

Get user by id:

```bash
curl http://localhost:3030/api/v1/1
```

Update a user (PUT):

```bash
curl -X PUT http://localhost:3030/api/v1/1 \
	-H "Content-Type: application/json" \
	-d '{"name":"Stephen Updated","role":"backend"}'
```

Delete a user:

```bash
curl -X DELETE http://localhost:3030/api/v1/1
```

## Validation & error handling

- `userValidator` middleware (in `middleware/userValidate.js`) enforces that `name` and `role` are present for create and update.
- If validation fails the API responds with `400` and a JSON error array describing issues.
- The project uses a centralized error handler (`middleware/error.js`). Controllers create `Error` objects with an attached `status` to signal non-2xx responses (for example 404 when a user can't be found).
- Unknown routes are handled by `middleware/404.js` which forwards a `Not Found` error.

## Logging

All incoming requests are logged to the console by `middleware/logger.js`. In production replace or enhance this with a structured logger (winston, pino) and send logs to a log aggregation service.

## Tests

There are no automated tests included. Suggested next steps:

- Add unit tests for controllers (jest + supertest)
- Add integration tests to cover route responses and error cases

## Contributing

This repository is a small demo. If you want to extend it, consider:

- Persisting data using a database (SQLite, PostgreSQL, MongoDB)
- Adding authentication and authorization
- Replacing in-memory store with a service layer
- Adding CI and tests

## License

ISC — see `package.json` for details.

## Contact

Author: `stephen oisewemen` (see package.json)