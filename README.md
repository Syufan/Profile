# Portfolio
A full-stack portfolio website built with Next.js, Spring Boot, and a FastAPI-based chatbot, deployed across Vercel, AWS EC2, and Railway.

## Overview
This project is my personal portfolio site. It includes:

- a responsive frontend built with Next.js
- a Spring Boot backend serving portfolio data
- an AI chatbot service for interactive portfolio Q&A
- CI/CD pipelines for automated build and deployment
- Cloudflare for DNS and traffic routing
- AWS S3 for resume file hosting

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, DaisyUI
- Backend: Spring Boot, Java
- Chatbot: FastAPI, Python, OpenAI API
- Testing: JUnit 5, Mockito, Jest, React Testing Library, Pytest
- Deployment: Vercel, AWS EC2, Railway, Docker, GitHub Actions, Cloudflare, AWS S3

## Architecture
```
Browser → Cloudflare → jeffzhang.dev → Vercel (Next.js)
Browser → Cloudflare → api.jeffzhang.dev → EC2 (Spring Boot)
Browser → chat.jeffzhang.dev → Railway (FastAPI chatbot)
Resume PDF → AWS S3
```

## Local Development

### Backend

```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```
API runs on `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:3000`

### Chatbot
```bash
cd chatboat
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m src.web.main
```
App runs on http://localhost:8000

## Live
- Frontend: https://jeffzhang.dev
- Backend API: https://api.jeffzhang.dev
- Chatbot API: https://chat.jeffzhang.dev

## Preview
<img width="1360" height="777" alt="image" src="https://github.com/user-attachments/assets/bc51b5b7-9938-451a-9b13-d702d7070925" />
<img width="1360" height="777" alt="image" src="https://github.com/user-attachments/assets/97dad0fd-a7ec-443e-8975-8fac4718a558" />
<img width="1360" height="777" alt="image" src="https://github.com/user-attachments/assets/bd57cd5b-8ae9-465f-8208-635af2e8451b" />




