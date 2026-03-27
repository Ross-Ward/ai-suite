import { Course, Lesson } from '@/types'
import { db } from '@/lib/db'
import { slugify } from '@/lib/utils'

export class CourseService {
  async createCourse(
    userId: string,
    data: { title: string; description: string }
  ): Promise<Course> {
    try {
      const slug = slugify(data.title)
      
      return await db.course.create({
        data: {
          title: data.title,
          description: data.description,
          slug,
          userId,
        },
        include: {
          lessons: true,
        },
      })
    } catch (error) {
      console.error('Error creating course:', error)
      throw new Error('Failed to create course')
    }
  }

  async getCoursesByUser(userId: string): Promise<Course[]> {
    try {
      return await db.course.findMany({
        where: { userId },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
    } catch (error) {
      console.error('Error getting courses:', error)
      throw new Error('Failed to get courses')
    }
  }

  async getCourseBySlug(slug: string, userId?: string): Promise<Course | null> {
    try {
      const where = userId ? { slug, userId } : { slug, published: true }
      
      return await db.course.findFirst({
        where,
        include: {
          lessons: {
            where: userId ? {} : { published: true },
            orderBy: { order: 'asc' },
          },
        },
      })
    } catch (error) {
      console.error('Error getting course:', error)
      return null
    }
  }

  async updateCourse(
    id: string,
    userId: string,
    data: { title?: string; description?: string; published?: boolean }
  ): Promise<Course> {
    try {
      return await db.course.update({
        where: { id, userId },
        data: {
          title: data.title,
          description: data.description,
          published: data.published,
        },
        include: {
          lessons: true,
        },
      }) as Course
    } catch (error) {
      console.error('Error updating course:', error)
      throw new Error('Failed to update course')
    }
  }

  async deleteCourse(id: string, userId: string): Promise<void> {
    try {
      await db.course.delete({
        where: { id, userId },
      })
    } catch (error) {
      console.error('Error deleting course:', error)
      throw new Error('Failed to delete course')
    }
  }

  async createLesson(
    courseId: string,
    userId: string,
    data: { title: string; content: string }
  ): Promise<Lesson> {
    try {
      // Verify course ownership
      const course = await db.course.findFirst({
        where: { id: courseId, userId },
      })

      if (!course) {
        throw new Error('Course not found or access denied')
      }

      // Get next order number
      const lastLesson = await db.lesson.findFirst({
        where: { courseId },
        orderBy: { order: 'desc' },
      })

      const order = (lastLesson?.order || 0) + 1

      return await db.lesson.create({
        data: {
          courseId,
          title: data.title,
          content: data.content,
          order,
        },
      })
    } catch (error) {
      console.error('Error creating lesson:', error)
      throw new Error('Failed to create lesson')
    }
  }

  async updateLesson(
    id: string,
    courseId: string,
    userId: string,
    data: Partial<Lesson>
  ): Promise<Lesson> {
    try {
      // Verify course ownership
      const course = await db.course.findFirst({
        where: { id: courseId, userId },
      })

      if (!course) {
        throw new Error('Course not found or access denied')
      }

      return await db.lesson.update({
        where: { id, courseId },
        data,
      })
    } catch (error) {
      console.error('Error updating lesson:', error)
      throw new Error('Failed to update lesson')
    }
  }

  async deleteLesson(id: string, courseId: string, userId: string): Promise<void> {
    try {
      // Verify course ownership
      const course = await db.course.findFirst({
        where: { id: courseId, userId },
      })

      if (!course) {
        throw new Error('Course not found or access denied')
      }

      await db.lesson.delete({
        where: { id, courseId },
      })
    } catch (error) {
      console.error('Error deleting lesson:', error)
      throw new Error('Failed to delete lesson')
    }
  }
}