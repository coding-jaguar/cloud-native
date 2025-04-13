# SIT737 5.1P: Containerisation of a Web Application

## 🚀 Overview
This project demonstrates containerising a simple Node.js web application using Docker and Docker Compose.

## 🛠 Tools Used
- Node.js
- Express.js
- Docker
- Docker Compose
- Git + GitHub

## 📦 Steps

1. **Create Node.js App** (`index.js`, `package.json`)
2. **Write Dockerfile**: Defines environment and build process.
3. **Docker Compose**: Handles multi-container setup and health check.
4. **Health Check**: Ensures app is responsive; container restarts if unhealthy.
5. **Push to GitHub**: Repository link - `https://github.com/coding-jaguar/cloud-native.git`

## ✅ To Run
```bash
git clone https://github.com/coding-jaguar/cloud-native.git
cd \5.1p\app
docker-compose up --build
