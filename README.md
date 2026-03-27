# Next.js AI SaaS Starter 🚀

A comprehensive, production-ready Next.js + TypeScript starter template for building AI-powered SaaS applications. Built with modern technologies and following SOLID principles for scalable, maintainable code.

## ✨ Features

### 🔐 **Authentication & User Management**
- **Clerk Integration**: Complete authentication system with sign-up, sign-in, and user management
- **Protected Routes**: Middleware-based route protection
- **User Profiles**: Automatic user creation and management

### 🤖 **AI Integration**
- **OpenAI Integration**: Modular AI service with chat completions and embeddings
- **Usage Tracking**: Token consumption and cost tracking per user
- **Content Moderation**: Built-in content filtering
- **Flexible Architecture**: Easy to swap AI providers

### 💳 **Billing & Subscriptions** (Ready to implement)
- **Stripe Integration**: Complete subscription management setup
- **Plan Enforcement**: Feature access based on subscription tiers
- **Usage Billing**: Track and bill for AI usage
- **Webhook Handling**: Automated subscription updates

### 📚 **Domain Features**
- **Course Management**: Built-in educational platform capabilities
- **AI Chat Interface**: Ready-to-use chat component
- **Dashboard**: User dashboard with analytics
- **Modular Architecture**: Easy to extend with new features

### 🏗️ **Architecture & Best Practices**
- **SOLID Principles**: Dependency inversion, single responsibility
- **Clean Architecture**: Interfaces, services, and dependency injection
- **Type Safety**: Full TypeScript coverage with Zod validation
- **Testing Ready**: Vitest setup with React Testing Library

### 🚀 **Developer Experience**
- **Hot Reload**: Fast development with Next.js 15
- **Code Quality**: ESLint, Prettier, and automated formatting
- **Database**: Prisma ORM with PostgreSQL
- **Deployment**: Docker and CI/CD ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Clerk account (free tier available)
- OpenAI API key

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd nextjs-ai-saas-starter
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Fill in your `.env` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# OpenAI
OPENAI_API_KEY=sk-...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup
```bash
npm run db:generate
npm run db:push
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── ai-chat/          # AI chat feature
│   └── globals.css        # Global styles
├── components/            # Shared UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── ai/               # AI-specific components
│   └── layout/           # Layout components
├── lib/                  # Core utilities and services
│   ├── interfaces/       # Service interfaces
│   ├── services/         # Service implementations
│   ├── env.ts           # Environment validation
│   ├── db.ts            # Database connection
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
├── prisma/              # Database schema and migrations
└── tests/               # Test files
```

## 🏗️ Architecture

### Service Layer Pattern
The application follows a clean architecture with dependency injection:

```typescript
// Interface definition
interface IAiService {
  generateCompletion(messages: AiMessage[]): Promise<AiResponse>
}

// Implementation
class OpenAiService implements IAiService {
  async generateCompletion(messages: AiMessage[]): Promise<AiResponse> {
    // Implementation details
  }
}

// Usage
const aiService: IAiService = new OpenAiService()
```

### Key Principles
- **Single Responsibility**: Each service has a focused purpose
- **Dependency Inversion**: Services depend on abstractions, not concretions
- **Open/Closed**: Easy to extend without modifying existing code
- **Interface Segregation**: Small, focused interfaces

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier
npm run type-check      # TypeScript type checking

# Testing
npm run test            # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Prisma Studio
```

## 🔧 Customization

### Adding New AI Providers
```typescript
class CustomAiService implements IAiService {
  async generateCompletion(messages: AiMessage[]): Promise<AiResponse> {
    // Your custom implementation
  }
}
```

### Adding New Features
1. Create interfaces in `lib/interfaces/`
2. Implement services in `lib/services/`
3. Add API routes in `app/api/`
4. Create UI components
5. Add to navigation

### Environment Configuration
All environment variables are validated using Zod schemas in `lib/env.ts`. Add new variables there for type safety.

## 🚀 Deployment

### Docker
```bash
docker build -t nextjs-ai-saas .
docker run -p 3000:3000 nextjs-ai-saas
```

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application is containerized and can be deployed to any platform that supports Docker or Node.js.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Clerk](https://clerk.com/) for authentication
- [OpenAI](https://openai.com/) for AI capabilities
- [Vercel](https://vercel.com/) for hosting and deployment

---

**Ready to build something amazing?** 🚀

Start with this template and focus on your unique features while we handle the boilerplate!