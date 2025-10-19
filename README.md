<body>

<h1>Taskflow API</h1>

<p><strong>Taskflow API</strong> is a <em>NestJS + PostgreSQL</em> backend that powers the Taskflow productivity app — enabling secure task management, user authentication via Google OAuth2, and robust RESTful endpoints for future extensions.</p>

<section>
  <h2>🚀 Features</h2>
  <ul>
    <li>🔐 <strong>Google OAuth2 Authentication</strong>: integrated via the official Google Auth Library, generates JWTs for session management.</li>
    <li>👤 <strong>User Management</strong>: automatic user creation and lookup upon first Google login.</li>
    <li>✅ <strong>Task Management</strong>: CRUD operations for tasks, including creation, updating, listing, and overdue tracking.</li>
    <li>⚙️ <strong>Database Integration</strong>: using <code>typeorm</code> with PostgreSQL, migrations and entity synchronization.</li>
    <li>🌿 <strong>Environment-Based Configuration</strong>: secrets and settings loaded via <code>@nestjs/config</code> and <code>.env</code> files.</li>
  </ul>
</section>

<section>
  <h2>🧩 Tech Stack</h2>
  <table>
    <tr><th>Layer</th><th>Technology</th></tr>
    <tr><td>Backend Framework</td><td>NestJS</td></tr>
    <tr><td>Database</td><td>PostgreSQL</td></tr>
    <tr><td>ORM</td><td>TypeORM</td></tr>
    <tr><td>Authentication</td><td>Google OAuth2 + JWT</td></tr>
    <tr><td>Config</td><td>@nestjs/config, dotenv</td></tr>
    <tr><td>Validation & Serialization</td><td>class-validator, class-transformer</td></tr>
  </table>
</section>

<section>
  <h2>🛠️ Setup & Installation</h2>
  <ol>
    <li><strong>Clone the repository</strong>
      <pre>git clone https://github.com/MrSSHH/taskflow-api.git
cd taskflow-api</pre>
    </li>
    <li><strong>Install dependencies</strong>
      <pre>npm install</pre>
    </li>
    <li><strong>Configure environment variables</strong> – create a <code>.env</code> file in the root:
      <pre>
# Database
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
      </pre>
    </li>
    <li><strong>Run development server</strong>
      <pre>npm run start:dev</pre>
    </li>
  </ol>
</section>

<section>
  <h2>🗃️ Migrations</h2>
  <p>When using migrations, follow the commands below:</p>
  <ul>
    <li><strong>Generate a migration:</strong>
      <pre>npm run migration:generate</pre>
    </li>
    <li><strong>Run migrations:</strong>
      <pre>npm run migration:run</pre>
    </li>
    <li><strong>Revert last migration:</strong>
      <pre>npm run migration:revert</pre>
    </li>
  </ul>
</section>

<section>
  <h2>🔑 API Endpoints</h2>
  <h3>Auth</h3>
  <table>
    <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
    <tr><td>POST</td><td><code>/api/auth/google</code></td><td>Verify Google ID token and issue JWT</td></tr>
  </table>
  <h3>Tasks</h3>
  <table>
    <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
    <tr><td>GET</td><td><code>/api/tasks</code></td><td>List all tasks (requires JWT)</td></tr>
    <tr><td>POST</td><td><code>/api/tasks</code></td><td>Create a new task</td></tr>
    <tr><td>PATCH</td><td><code>/api/tasks/:id</code></td><td>Update an existing task</td></tr>
    <tr><td>DELETE</td><td><code>/api/tasks/:id</code></td><td>Delete a task</td></tr>
    <tr><td>GET</td><td><code>/api/tasks/overdue</code></td><td>Count overdue tasks</td></tr>
  </table>
</section>

<section>
  <h2>📁 Project Structure</h2>
  <pre>
src/
  ├── auth/
  │     ├── auth.controller.ts
  │     ├── auth.service.ts
  │     ├── dto/
  │     │   └── google-login.dto.ts
  │     └── auth.module.ts
  ├── users/
  │     ├── entities/
  │     │   └── user.entity.ts
  │     ├── dto/
  │     │   └── create-user.dto.ts
  │     └── users.service.ts
  ├── tasks/
  │     ├── entities/
  │     │   └── task.entity.ts
  │     ├── tasks.service.ts
  │     └── tasks.controller.ts
  ├── app.module.ts
  ├── main.ts
  └── data-source.ts
  </pre>
</section>

<section>
  <h2>🧰 Development Utilities</h2>
  <p><strong>Reset database for local dev</strong>:</p>
  <pre>
# Only for dev & local environments:
synchronize: true
dropSchema: true
  </pre>
  <p>Use them in <code>TypeOrmModule.forRoot()</code> for quick refresh of schema.</p>
</section>

<section>
  <h2>📜 License</h2>
  <p>This project is licensed under the <strong>MIT License</strong>.</p>
</section>

</body>
</html>