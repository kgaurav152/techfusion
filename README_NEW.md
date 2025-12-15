# 🎓 TechFusion 2025 - Katihar Engineering College

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **A modern, scalable event management platform for the annual Technical Cum Cultural Festival of Katihar Engineering College, Katihar.**

**Live Website:** [https://techfusion.org.in](https://techfusion.org.in)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

TechFusion is a full-stack event management platform built with **Next.js 14**, **React**, **TypeScript**, and **MongoDB**. It provides a seamless experience for:

- ✅ **Event Registration** - Register for technical & cultural events
- 👥 **User Management** - Multiple user roles (Admin, Coordinator, Participant, Hospitality)
- 📊 **Admin Dashboard** - Comprehensive analytics and management
- 🏠 **Hospitality Management** - Accommodation tracking
- 📜 **Certificate Generation** - Automated certificate issuance
- 📱 **Progressive Web App** - Installable mobile experience

---

## ✨ Features

### For Participants
- Browse and filter events (Technical, Cultural, Workshops)
- Register for events with team management
- View participation status and results
- Download certificates
- Track event schedules

### For Coordinators
- Manage assigned events
- Approve/reject participant registrations
- View participant lists and details
- Generate reports

### For Administrators
- Complete event management (CRUD)
- User management
- View real-time statistics and analytics
- Hospitality coordination
- Result declaration and certificate management

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework with SSR/SSG
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn-ui** - Accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Framer Motion** - Animation library
- **React Hook Form + Zod** - Form validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB + Mongoose** - Database & ODM
- **JWT** - Authentication
- **Cloudinary** - Image & file uploads
- **Nodemailer** - Email notifications

### Development Tools
- **Jest + React Testing Library** - Unit & integration testing
- **ESLint + Prettier** - Code formatting & linting
- **Husky + lint-staged** - Pre-commit hooks
- **TypeScript** - Static type checking

### DevOps
- **Vercel** - Deployment platform
- **next-pwa** - Progressive Web App support
- **Vercel Analytics** - Performance monitoring

---

## 📁 Project Structure

```
techfusion/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   ├── (routes)/            # Public routes
│   │   ├── (dashboard)/     # User dashboards
│   │   ├── admin/           # Admin panel
│   │   ├── coordinator/     # Coordinator panel
│   │   └── hospitality/     # Hospitality management
│   ├── api/                 # API endpoints
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── ui/                  # shadcn-ui components
│   ├── custom/              # Custom reusable components
│   ├── layout/              # Layout components
│   └── *.jsx                # Feature-specific components
│
├── lib/                     # Utility libraries
│   ├── api/                 # API client & endpoints
│   ├── validations/         # Zod schemas
│   ├── utils.js             # Helper functions
│   └── imageUploader.js     # Cloudinary integration
│
├── hooks/                   # Custom React hooks
│   ├── use-api.ts           # Data fetching hook
│   ├── use-form.ts          # Form handling hook
│   ├── use-async.ts         # Async operation hook
│   └── index.ts             # Barrel exports
│
├── types/                   # TypeScript definitions
│   ├── domain.ts            # Domain models
│   ├── api.ts               # API types
│   └── index.ts             # Shared types
│
├── models/                  # Mongoose schemas
│   ├── User.js
│   ├── Event.js
│   ├── Participation.js
│   └── ...
│
├── config/                  # Configuration files
│   ├── dbconfig.js          # MongoDB connection
│   └── cloudinary.js        # Cloudinary setup
│
├── helpers/                 # Helper modules
│   ├── apiConnector.js
│   ├── getDataFromToken.js
│   └── mailService.js
│
├── __tests__/               # Test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── fixtures/            # Test mocks & utilities
│
├── public/                  # Static assets
├── redux/                   # Redux store (minimal usage)
├── middleware.js            # Next.js middleware
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind configuration
├── jest.config.js           # Jest configuration
└── package.json             # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.17+ and npm/yarn/pnpm
- **MongoDB** instance (local or cloud)
- **Cloudinary** account for image uploads
- **SMTP** credentials for email (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kgaurav152/techfusion.git
   cd techfusion
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/techfusion
   # or MongoDB Atlas connection string

   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-this

   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Email (Nodemailer)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # Application
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Building
npm run build            # Create production build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking

# Testing
npm test                 # Run tests in watch mode
npm run test:ci          # Run tests with coverage (CI)
npm run test:coverage    # Generate coverage report

# Validation
npm run validate         # Run type-check + lint + test
```

### Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
import { Button } from '@/components/ui/button'
import { eventApi } from '@/lib/api'
import { useForm } from '@/hooks'
import type { Event } from '@/types'
```

### Code Style

- **TypeScript** for all new files (`.ts`, `.tsx`)
- **Functional components** with hooks
- **Named exports** preferred over default exports
- **Minimal comments** - code should be self-documenting
- **Semantic naming** - descriptive variable/function names

---

## 🧪 Testing

### Running Tests

```bash
# Watch mode (development)
npm test

# Single run with coverage
npm run test:coverage

# CI mode
npm run test:ci
```

### Writing Tests

#### Component Tests
```typescript
// __tests__/unit/components/button.test.tsx
import { render, screen, userEvent } from '@/__tests__/fixtures/test-utils'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders and handles click', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### API Tests
```typescript
// __tests__/integration/api/events.test.ts
import { GET } from '@/app/api/event/route'

describe('GET /api/event', () => {
  it('returns events list', async () => {
    const request = new Request('http://localhost:3000/api/event')
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
  })
})
```

### Test Coverage

Target coverage thresholds:
- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

---

## 🔍 Code Quality

### Pre-commit Hooks

Husky runs these checks before every commit:
- **ESLint** - Lints staged `.js/.jsx/.ts/.tsx` files
- **Prettier** - Formats all staged files
- **TypeScript** - Type checks (optional)

### Manual Checks

```bash
# Run all checks before PR
npm run validate

# Individual checks
npm run type-check    # TypeScript errors
npm run lint          # ESLint warnings/errors
npm run format:check  # Prettier formatting
npm run test:ci       # All tests + coverage
```

---

## 🏗 Architecture

### Design Principles

1. **Separation of Concerns**
   - Components focus on UI
   - Hooks manage state & side effects
   - Services handle business logic
   - API client manages requests

2. **Type Safety**
   - TypeScript strict mode enabled
   - Runtime validation with Zod
   - Typed API responses

3. **Performance**
   - Server-side rendering (SSR)
   - Static generation (SSG) where possible
   - Image optimization (next/image)
   - Code splitting & lazy loading

4. **Accessibility**
   - Semantic HTML
   - ARIA attributes via Radix UI
   - Keyboard navigation support

### Key Patterns

#### Data Fetching Hook
```typescript
import { useApi } from '@/hooks'
import { eventApi } from '@/lib/api'

function EventList() {
  const { data, loading, error } = useApi(() => eventApi.getAll())
  
  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  
  return <div>{data.map(event => <EventCard event={event} />)}</div>
}
```

#### Form Validation
```typescript
import { useForm } from '@/hooks'
import { loginSchema } from '@/lib/validations'

function LoginForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await authApi.login(values)
    },
  })
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run validate`)
5. Commit with descriptive message (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Commit Message Format

```
feat: add user profile page
fix: resolve event registration bug
docs: update README with new API
style: format with prettier
refactor: extract validation logic
test: add unit tests for Button
chore: update dependencies
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Media Management

---

## 📧 Contact

**TechFusion Team** - Katihar Engineering College, Katihar

- Website: [https://techfusion.org.in](https://techfusion.org.in)
- Email: support@techfusion.org.in
- GitHub: [@kgaurav152](https://github.com/kgaurav152)

---

**Built with ❤️ for the students of Katihar Engineering College**
