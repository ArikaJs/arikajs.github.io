# ArikaJS — The High-Performance Web Framework for Modern Node.js

<div align="center">

<img src="https://raw.githubusercontent.com/ArikaJs/arikajs/main/packages/cli/templates/app/public/assets/img/logo.png" alt="ArikaJS Logo" width="350">

**Official Documentation & Website Source**

[![Live Site](https://img.shields.io/badge/Live-arikajs.com-blue.svg)](https://arikajs.com)
[![Version](https://img.shields.io/badge/Arika_Version-0.10.x-brightgreen.svg)](https://www.npmjs.com/package/arikajs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Discord](https://img.shields.io/badge/Discord-Join-7289da?style=flat&logo=discord&logoColor=white)](https://discord.gg/XUTjzwjrHK)

</div>

---

## 🏛️ About ArikaJS

ArikaJS is a modern, modular web framework for Node.js designed to provide an expressive syntax and blazing-fast performance. Inspired by industry standards like **Laravel** and **Fastify**, ArikaJS brings professional-grade engineering to the Node.js ecosystem, focusing on developer productivity without compromising on speed.

This repository serves as the official documentation and landing page source for the framework.

---

## ⚡ Performance: The Arika Edge

Speed is at the core of ArikaJS. Designed for horizontal scalability and minimal overhead, ArikaJS consistently outperforms other popular Node.js frameworks.

| Framework | Requests/sec | Avg Latency |
| :--- | :--- | :--- |
| **ArikaJS** | **42,800** 🥇 | **3.9ms** |
| Fastify | 40,400 🥈 | 4.2ms |
| Express | 16,500 🥉 | 11.8ms |

---

## 🚀 Developer Documentation (v0.10.x)

This section provides a comprehensive guide to using the ArikaJS framework components.

### 🛤️ 1. Routing System
ArikaJS offers a fluent routing API that makes defining endpoints intuitive and readable.

```typescript
import { Route } from 'arikajs';

// Basic GET endpoint
Route.get('/', () => 'Hello World');

// Route parameters with type inference
Route.get('/user/:id', (req) => {
    return { id: req.params.id };
});

// Powerful Grouping (Prefix + Middleware)
Route.prefix('admin').middleware(['auth', 'verified']).group(() => {
    Route.get('/dashboard', [DashboardController, 'index']);
    Route.post('/report', [ReportController, 'store']);
});

// RESTful Resource Routes
Route.resource('products', ProductController);
```

### 🗄️ 2. Database & ORM (Active Record)
The `@arikajs/database` package provides a robust ORM similar to Eloquent, allowing you to interact with your database using elegant classes.

```typescript
import { Model } from 'arikajs';

class User extends Model {
    protected static table = 'users';

    // Relationships made easy
    posts() {
        return this.hasMany(Post);
    }
}

// Fluent Queries
const users = await User.where('active', true)
    .orderBy('last_login', 'desc')
    .limit(10)
    .get();

// Creating Records
const newUser = await User.create({
    name: 'Prakash Tank',
    email: 'prakash@arikajs.com'
});
```

### 🛂 3. Authentication & Security
Integrated authentication with support for multiple guards and hashing.

```typescript
import { Auth, Hash } from 'arikajs';

// Attempt Authentication
const success = await Auth.attempt({ email, password });

if (success) {
    const user = Auth.user();
    const token = await Auth.token(); // Generate JWT or Session token
}

// Password Hashing
const hashed = await Hash.make('secret-password');
```

### ✅ 4. Request Validation
Sanitize and validate incoming data using a simple, declarative syntax.

```typescript
import { Validator } from 'arikajs';

const rules = {
    title: 'required|string|max:100',
    email: 'required|email|unique:users',
    age: 'numeric|min:18'
};

const validator = Validator.make(request.all(), rules);

if (validator.fails()) {
    return response.status(422).json(validator.errors());
}
```

### 📅 5. Carbon Dates
Never struggle with dates again. ArikaJS includes `@arikajs/carbon` for elegant date/time manipulation.

```typescript
import { carbon } from 'arikajs';

carbon().now().addDays(7).diffForHumans(); // "in 1 week"
carbon().parse('2026-04-16').isWeekend(); // true/false
carbon().today().startOfDay().toISOString();
```

### 📦 6. Other Core Services
- **View Engine:** `view('welcome', { name: 'Arika' })` (Powered by `@arikajs/view`)
- **File Storage:** `Storage.disk('s3').put('avatar.png', file)`
- **Task Scheduling:** `Schedule.command('emails:send').daily()`
- **Background Queues:** `dispatch(new ProcessPodcast(id))`

---

## 🛠️ CLI Toolkit
The `arika` command-line tool is your assistant for rapid development.

| Command | Usage |
| :--- | :--- |
| `arika new <name>` | Scaffold a fresh ArikaJS project |
| `arika make:model` | Generate Model + Migration file |
| `arika make:controller` | Create a new Controller |
| `arika migrate` | Execute pending database migrations |
| `arika route:list` | Log all registered application routes |

---

## 🌐 Website Development
The official website is built using **Vanilla HTML/CSS/JS** for maximum performance and compatibility with GitHub Pages.

### Local Development
To preview the website locally, simply open `index.html` in your browser or use a live server extension.

```bash
# Recommendation: use live-server
pnpm dlx live-server
```

### Structure
- `index.html`: Main landing page
- `docs.html`: Documentation index
- `style.css`: Modern, responsive styling system
- `script.js`: Interactive UI components

---

## 🤝 Contributing
For framework-related issues or contributions, please visit the [Main Framework Repository](https://github.com/arikajs/arikajs).

If you wish to improve the documentation or website, feel free to open a Pull Request here!

---

<div align="center">

**Built with ❤️ by [Prakash Tank](https://github.com/prakashtank) and the ArikaJS Community**

[GitHub](https://github.com/arikajs) • [Documentation](https://arikajs.com/docs) • [Discord](https://discord.gg/XUTjzwjrHK)

</div>
