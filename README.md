# 🚀 Taskflow API

Taskflow API is a modern **NestJS + PostgreSQL** backend powering the Taskflow productivity suite — enabling secure task management, Google OAuth2 login, and scalable REST endpoints.

---

## ✨ Features

- 🔐 **Google OAuth2 Authentication** — Secure JWT sessions using the official Google Auth Library.  
- 👤 **User Management** — Automatically creates or retrieves users upon Google login.  
- ✅ **Task Management** — Perform complete CRUD operations with overdue tracking and pagination.  
- ⚙️ **Database Integration** — Robust ORM support with **TypeORM**, PostgreSQL, and seamless schema migrations.  
- 🌿 **Environment-Based Configuration** — Simple `.env` setup powered by `@nestjs/config`.

---

## 🧩 Tech Stack

| Layer | Technology |
| :---- | :---------- |
| Backend Framework | NestJS |
| Database | PostgreSQL |
| ORM | TypeORM |
| Authentication | Google OAuth2 + JWT |
| Configuration | @nestjs/config, dotenv |
| Validation | class-validator, class-transformer |

---

## 🛠️ Setup & Installation

1. **Clone the Repository**
   ```
   git clone https://github.com/MrSSHH/taskflow-api.git
   cd taskflow-api
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Create a `.env` File**
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_pass
   DB_NAME=your_db_name

   # JWT
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1h

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Start the Development Server**
   * Requires Docker to be installed.
   ```
   ./start-dev-env.sh
   ```

---

## 🗃️ Database Migrations

Use TypeORM CLI commands to manage migrations:

```
# Generate a new migration
npm run migration:generate

# Run migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
| :------ | :-------- | :----------- |
| POST | `/api/auth/google` | Verify Google ID token and issue JWT |

### Tasks
| Method | Endpoint | Description |
| :------ | :-------- | :----------- |
| GET | `/api/tasks` | Retrieve all tasks (JWT required) |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/tasks/overdue` | Count overdue tasks |

---

## 📂 Project Structure

```
src/
 ├── auth/
 │   ├── auth.controller.ts
 │   ├── auth.service.ts
 │   ├── dto/
 │   │   └── google-login.dto.ts
 │   └── auth.module.ts
 ├── users/
 │   ├── entities/
 │   │   └── user.entity.ts
 │   ├── dto/
 │   │   └── create-user.dto.ts
 │   └── users.service.ts
 ├── tasks/
 │   ├── entities/
 │   │   └── task.entity.ts
 │   ├── tasks.service.ts
 │   └── tasks.controller.ts
 ├── app.module.ts
 ├── main.ts
 └── data-source.ts
```

---

## 🧰 Development Utilities

For rapid iteration during local development, you can temporarily enable auto schema refresh:

```
synchronize: true
dropSchema: true
```

**Note:** Do **not** use these settings in production.

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to modify.  
Follow conventional commit formatting and ensure all tests pass before submitting.

---

## 🧾 License

Licensed under the **MIT License** © 2025 **Taskflow**
[View on GitHub →](https://github.com/MrSSHH/taskflow-api)
