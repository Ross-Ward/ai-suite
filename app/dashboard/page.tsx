import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot, BookOpen, CreditCard, TrendingUp } from 'lucide-react'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.firstName}!
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Usage</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">tokens used this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">active courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground">current plan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/ai-chat">
                <Button className="w-full" variant="outline">
                  <Bot className="mr-2 h-4 w-4" />
                  Start AI Chat
                </Button>
              </Link>
              <Link href="/courses/new">
                <Button className="w-full" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Course
                </Button>
              </Link>
              <Link href="/billing">
                <Button className="w-full" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Billing
                </Button>
              </Link>
              <Link href="/settings">
                <Button className="w-full" variant="outline">
                  Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Bot className="mr-2 h-4 w-4 text-blue-500" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    AI Chat Session
                  </p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-green-500" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Course Updated
                  </p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4 text-purple-500" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Profile Updated
                  </p>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}