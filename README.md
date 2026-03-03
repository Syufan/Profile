# Portfolio
A full-stack portfolio site built with Next.js and Spring Boot, deployed to AWS EC2 with a complete CI/CD pipeline.

## Tech Stack
- Frontend: Next.js + TypeScript + Tailwind CSS + DaisyUI
- Backend: Spring Boot
- Test: JUnit 5, Mockito, React Testing Library, Jest
- Deployment: AWS EC2 + Docker + GitHub Actions CI/CD
- CDN & Security: Cloudflare
- Frontend Hosting: Vercel
- File Storage: AWS S3

## Architecture
```
Browser → Cloudflare → jeffzhang.dev → Vercel (Next.js)
Browser → Cloudflare → api.jeffzhang.dev → EC2 (Spring Boot)
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

## Preview
<img width="1361" height="783" alt="image" src="https://github.com/user-attachments/assets/787c6f35-c4b0-4b89-bbe2-50f5e26755ab" />
<img width="1361" height="783" alt="image" src="https://github.com/user-attachments/assets/a96aefa6-aa47-4fef-b70a-35631ea8112d" />



