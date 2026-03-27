import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/layout/navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI SaaS Starter',
  description: 'A comprehensive Next.js starter for AI-powered SaaS applications',
  keywords: ['Next.js', 'AI', 'SaaS', 'TypeScript', 'Clerk', 'Stripe'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}