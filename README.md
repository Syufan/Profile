# Portfolio
A personal portfolio website to showcase my projects and technical skills.

## Tech Stack
- Frontend: Next.js + TypeScript + Tailwind CSS + DaisyUI
- Backend: Spring Boot
- Deployment: AWS EC2 + Docker + GitHub Actions CI/CD
- CDN & Security: Cloudflare
- Frontend Hosting: Vercel
- File Storage: AWS S3

## Project Structure
- `frontend/` — Next.js application
- `backend/` — Spring Boot application

## Architecture
```
User → Cloudflare → api.jeffzhang.dev → EC2 (Spring Boot)
User → jeffzhang.dev → Vercel (Next.js)
Resume PDF → AWS S3
```

## Getting Started
### Backend
```bash
cd backend
./mvnw spring-boot:run
```
API runs on `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:3000`

## Live
- Frontend: https://jeffzhang.dev
- Backend API: https://api.jeffzhang.dev

