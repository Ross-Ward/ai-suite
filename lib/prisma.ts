/**
 * Canonical Prisma client singleton.
 * Import `prisma` from here in all repositories.
 *
 * Note: `lib/db.ts` exports the same instance as `db` for backward compatibility.
 * New code should use this file.
 */
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
