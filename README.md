# 🔥 TaskFlow API

<div align="center">

**A modular and scalable task management API built with NestJS**

*Complete with support for priorities, due dates, statuses, and categories*

[![NestJS](https://img.shields.io/badge/NestJS-10+-e0234e?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-Ready-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org/)

[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)](https://github.com/MrSSHH/taskflow-api)
[![Frontend](https://img.shields.io/badge/Frontend-taskflow--frontend-blue?style=flat-square)](https://github.com/MrSSHH/taskflow-frontend)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**🎯 Powers the [TaskFlow Mobile App](https://github.com/MrSSHH/taskflow-frontend)**

</div>

## 🚀 What is TaskFlow API?

TaskFlow API is a **robust, modular, and scalable backend** built with NestJS that powers the TaskFlow mobile task management application. It provides a clean, organized architecture for creating, updating, organizing, and tracking tasks with comprehensive features including priorities, due dates, statuses, and categories.

### 🎯 **Key Features**

- **🏗️ Modular Architecture** - Clean, maintainable NestJS modules
- **📋 Complete Task Management** - Full CRUD operations with advanced features
- **🎯 Priority System** - High, Medium, Low priority levels
- **📅 Due Date Tracking** - Deadline management and reminders
- **📊 Status Management** - Todo, In Progress, Completed, Cancelled
- **🏷️ Category Organization** - Flexible task categorization
- **🔐 Secure Authentication** - JWT-based user authentication
- **📱 Mobile-First API** - Optimized for mobile app consumption
- **⚡ High Performance** - Built on NestJS for scalability
- **🧪 Testing Ready** - Comprehensive test suite included

## 🏗️ Architecture Overview

TaskFlow API follows NestJS best practices with a modular, scalable architecture:

```
📱 Mobile Frontend               🌐 NestJS API Server              💾 Database
┌─────────────────────────┐     ┌─────────────────────────────┐     ┌─────────────────────────┐
│                         │     │                             │     │                         │
│   TaskFlow Mobile       │────▶│      TaskFlow API           │────▶│      Database           │
│  (React + Ionic)        │     │     (NestJS + TypeScript)   │     │   (PostgreSQL/MySQL)    │
│                         │     │                             │     │                         │
└─────────────────────────┘     │  ┌─────────────────────────┐│     └─────────────────────────┘
                                │  │   Modular Structure     ││
                                │  │                         ││
                                │  │ • Auth Module          ││
                                │  │ • Tasks Module         ││
                                │  │ • Users Module         ││
                                │  │ • Categories Module    ││
                                │  │                         ││
                                │  └─────────────────────────┘│
                                └─────────────────────────────┘
```

## 🚧 Development Status

> **Work in Progress**: This NestJS API is actively being developed to support the TaskFlow mobile application.

### ✅ **Completed**
- [x] NestJS project setup and configuration
- [x] TypeScript development environment
- [x] Modular architecture foundation
- [x] Development and production scripts
- [x] Testing framework setup

### 🔄 **In Development**
- [ ] Authentication module (JWT-based)
- [ ] Task management module
- [ ] User management system
- [ ] Priority and status system
- [ ] Category management
- [ ] Due date and reminder system
- [ ] API validation and guards
