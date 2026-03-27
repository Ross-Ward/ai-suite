import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Zap, 
  Shield, 
  Bot, 
  CreditCard, 
  BookOpen, 
  Code, 
  Rocket 
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Build AI-Powered SaaS
            <br className="hidden sm:inline" />
            <span className="text-primary"> Applications</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A comprehensive Next.js starter template with authentication, billing, 
            AI integration, and modular architecture following SOLID principles.
          </p>
          <div className="space-x-4">
            <Link href="/sign-up">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Everything You Need
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Built with modern technologies and best practices for rapid development.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10" />
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Complete auth system with Clerk including sign-up, sign-in, and user management
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Bot className="h-10 w-10" />
              <CardTitle>AI Integration</CardTitle>
              <CardDescription>
                OpenAI integration with rate limiting, token tracking, and modular AI services
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CreditCard className="h-10 w-10" />
              <CardTitle>Billing & Subscriptions</CardTitle>
              <CardDescription>
                Stripe integration with subscription management and plan enforcement
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10" />
              <CardTitle>Course Management</CardTitle>
              <CardDescription>
                Built-in course and lesson management system for educational platforms
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Code className="h-10 w-10" />
              <CardTitle>Clean Architecture</CardTitle>
              <CardDescription>
                SOLID principles, dependency injection, and modular design patterns
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Rocket className="h-10 w-10" />
              <CardTitle>Production Ready</CardTitle>
              <CardDescription>
                Docker, CI/CD, testing, linting, and deployment configurations included
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to Build?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Start with our comprehensive template and focus on your unique features
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="mt-4">
              Start Building Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}