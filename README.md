# Manu Homeopathy Clinic & Research Center

A beautiful, modern website for Manu Homeopathy Clinic & Research Center - a classical homeopathy practice established in 1998 in Karnataka, India.

![Manu Homeopathy](https://img.shields.io/badge/Est.-1998-green) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## 🌿 About

Manu Homeopathy Clinic is one of the few homeopathic clinics in Karnataka practicing classical homeopathy, influenced by Dr. Prafful Vijaykar's teachings. For 28+ years, the clinic has successfully treated patients with ailments ranging from common colds to complex diseases.

### Our Doctors
- **Dr. Manohara MC** - Founder & Senior Consultant
- **Dr. Deepa Joshi** - Consultant Homeopath
- **Dr. Umme Hafeefa** - Consultant Homeopath

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm (or bun)
- Git

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd manu-homeopathy

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

---

## 🌐 Deployment Guide

### Frontend Deployment (Vercel - Free Tier)

Vercel is recommended for deploying the React frontend.

#### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

#### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project" → Import your GitHub repo
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"

#### Environment Variables (Vercel)

If you add a backend later, set these in Vercel Dashboard → Project → Settings → Environment Variables:

```env
VITE_API_BASE_URL=https://your-backend-url.railway.app
```

Usage in code:
```typescript
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
```

---

### Backend Deployment (Railway/Render - Free Tier)

If you add a Node.js/Express backend:

#### Railway Deployment

1. Create account at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Set environment variables:

```env
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/manu-homeopathy
```

#### Render Deployment

1. Create account at [render.com](https://render.com)
2. New → Web Service → Connect GitHub repo
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in dashboard

#### Procfile (for Heroku/Railway)

Create a `Procfile` in your backend directory:

```
web: npm start
```

---

### Database (MongoDB Atlas - Free Tier)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free M0 cluster
3. Create database user with password
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/manu-homeopathy?retryWrites=true&w=majority
```

Set as `MONGO_URI` environment variable in your backend.

---

## 🐳 Docker Setup (Local Development)

### docker-compose.yml

```yaml
version: '3.8'

services:
  # Frontend (React/Vite)
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "8080:8080"
    environment:
      - VITE_API_BASE_URL=http://localhost:3000
    depends_on:
      - backend
    volumes:
      - ./src:/app/src
      - ./public:/app/public

  # Backend (Node.js - if you add one)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=development
      - MONGO_URI=mongodb://mongo:27017/manu-homeopathy
    depends_on:
      - mongo

  # MongoDB
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=manu-homeopathy

volumes:
  mongo_data:
```

### Dockerfile.frontend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### Running with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## 📡 API Examples (When Backend is Added)

### cURL Examples

```bash
# Health check
curl -X GET http://localhost:3000/api/health

# Get all appointments
curl -X GET http://localhost:3000/api/appointments \
  -H "Content-Type: application/json"

# Create appointment
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "message": "Consultation for chronic allergies",
    "preferredDate": "2024-01-15"
  }'

# Get appointment by ID
curl -X GET http://localhost:3000/api/appointments/65a1234567890abcdef

# Update appointment status
curl -X PATCH http://localhost:3000/api/appointments/65a1234567890abcdef \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'

# Delete appointment
curl -X DELETE http://localhost:3000/api/appointments/65a1234567890abcdef
```

### Postman Collection

Import the following JSON into Postman:

```json
{
  "info": {
    "name": "Manu Homeopathy API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/health"
      }
    },
    {
      "name": "Get All Appointments",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/appointments"
      }
    },
    {
      "name": "Create Appointment",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/appointments",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"phone\": \"+919876543210\",\n  \"message\": \"Consultation for chronic allergies\"\n}"
        }
      }
    },
    {
      "name": "Get Appointment by ID",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/appointments/:id"
      }
    },
    {
      "name": "Update Appointment",
      "request": {
        "method": "PATCH",
        "url": "{{baseUrl}}/api/appointments/:id",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"status\": \"confirmed\"\n}"
        }
      }
    },
    {
      "name": "Delete Appointment",
      "request": {
        "method": "DELETE",
        "url": "{{baseUrl}}/api/appointments/:id"
      }
    }
  ]
}
```

---

## 📁 Project Structure

```
├── src/
│   ├── assets/              # Images and static assets
│   ├── components/          # React components
│   │   ├── ui/              # Shadcn UI components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── DoctorsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   ├── App.tsx              # Main app component
│   ├── index.css            # Global styles & design system
│   └── main.tsx             # Entry point
├── public/                  # Public static files
├── index.html               # HTML template with SEO
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── docker-compose.yml       # Docker setup (optional)
└── README.md                # This file
```

---

## 🎨 Design System

The project uses a carefully crafted design system with:

- **Primary**: Sage Green (#4A7C59) - Healing, natural medicine
- **Secondary**: Warm Cream - Comfort, trust
- **Accent**: Soft Gold - Warmth, premium feel
- **Fonts**: 
  - Headings: Cormorant Garamond (serif)
  - Body: Source Sans 3 (sans-serif)

All colors use HSL format and are defined as CSS custom properties in `src/index.css`.

---

## 🔧 Environment Variables Reference

### Frontend (.env or Vercel)
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Backend (Railway/Render/Heroku)
```env
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://yourdomain.com
```

---

## 📞 Contact

**Manu Homeopathy Clinic & Research Center**
- 📍 [View on Google Maps](https://maps.google.com/?q=Manu+Homeopathy+Clinic+Research+Center)
- 📧 contact@manuhomeopathy.com
- ⏰ Mon-Sat: 10:00 AM - 7:00 PM

---

## 📄 License

© 2024 Manu Homeopathy Clinic & Research Center. All rights reserved.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
