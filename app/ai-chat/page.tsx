import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { ChatInterface } from '@/components/ai/chat-interface'

export default async function AiChatPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Chat Assistant</h1>
        <p className="text-muted-foreground">
          Chat with our AI assistant to get help with your questions
        </p>
      </div>

      <ChatInterface />
    </div>
  )
}