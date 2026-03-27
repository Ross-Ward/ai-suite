import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseService } from '@/modules/courses/services/course.service'
import { AuthService } from '@/lib/services/auth.service'
import { formatDate } from '@/lib/utils'

export default async function CoursesPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const authService = new AuthService()
  const courseService = new CourseService()
  
  const dbUser = await authService.getCurrentUser()
  if (!dbUser) {
    redirect('/sign-in')
  }

  const courses = await courseService.getCoursesByUser(dbUser.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and lessons
          </p>
        </div>
        <Link href="/courses/new">
          <Button>Create New Course</Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No courses yet</CardTitle>
            <CardDescription>
              Create your first course to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/courses/new">
              <Button>Create Your First Course</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lessons:</span>
                    <span>{course.lessons.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className={course.published ? 'text-green-600' : 'text-yellow-600'}>
                      {course.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Created:</span>
                    <span>{formatDate(course.createdAt)}</span>
                  </div>
                  <div className="pt-4">
                    <Link href={`/courses/${course.slug}`}>
                      <Button className="w-full" variant="outline">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}