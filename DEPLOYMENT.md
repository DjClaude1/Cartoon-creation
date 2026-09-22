# Production Deployment Guide

## Prerequisites
- Node.js 18+
- NPM / Yarn

## Building the Web App
```bash
npm run build
```

## Running Full Stack App
The application bundles a Vite frontend with an Express API backend (`server.ts`):
```bash
# Starts both frontend and proxy backend on port 3000
npm start
```

## Environment Variables
Create a `.env` file based on `.env.example`:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```
