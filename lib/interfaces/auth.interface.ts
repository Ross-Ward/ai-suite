import { User } from '@/types'

export interface IAuthService {
  getCurrentUser(): Promise<User | null>
  getUserById(id: string): Promise<User | null>
  createUser(userData: { 
    clerkId: string; 
    email: string; 
    firstName?: string | null; 
    lastName?: string | null; 
    imageUrl?: string | null; 
  }): Promise<User>
  updateUser(id: string, userData: Partial<User>): Promise<User>
  deleteUser(id: string): Promise<void>
}

export interface IPermissionService {
  hasPermission(userId: string, permission: string): Promise<boolean>
  getUserRole(userId: string): Promise<string>
  checkAccess(userId: string, resource: string, action: string): Promise<boolean>
}