import { currentUser } from '@clerk/nextjs/server'
import { IAuthService } from '@/lib/interfaces'
import { User } from '@/types'
import { db } from '@/lib/db'

export class AuthService implements IAuthService {
  async getCurrentUser(): Promise<User | null> {
    try {
      const clerkUser = await currentUser()
      if (!clerkUser) return null

      let user = await db.user.findUnique({
        where: { clerkId: clerkUser.id },
      })

      if (!user) {
        user = await this.createUser({
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          firstName: clerkUser.firstName || null,
          lastName: clerkUser.lastName || null,
          imageUrl: clerkUser.imageUrl || null,
        })
      }

      return user as User
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: { id },
      })
      return user as User | null
    } catch (error) {
      console.error('Error getting user by ID:', error)
      return null
    }
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const createdUser = await db.user.create({
        data: {
          clerkId: userData.clerkId!,
          email: userData.email!,
          firstName: userData.firstName || null,
          lastName: userData.lastName || null,
          imageUrl: userData.imageUrl || null,
        },
      })
      return createdUser as User
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user')
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const updatedUser = await db.user.update({
        where: { id },
        data: userData,
      })
      return updatedUser as User
    } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('Failed to update user')
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await db.user.delete({
        where: { id },
      })
    } catch (error) {
      console.error('Error deleting user:', error)
      throw new Error('Failed to delete user')
    }
  }
}