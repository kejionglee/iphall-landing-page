// API client utilities for chat functionality

export interface ChatMessage {
  sender: "user" | "agent"
  text: string
  timestamp?: string
}

export interface ChatRequest {
  message: string
  conversation_id?: string
  context?: any
}

export interface ChatResponse {
  response: string
  conversation_id: string
  timestamp: string
  suggestions?: string[]
  workflow_step?: string
  workflow_data?: any
  current_service?: string
  current_country?: string
}

export interface HealthResponse {
  status: "healthy" | "unhealthy"
  timestamp: string
  database: string
  services: {
    database: string
    agent: string
    api: string
  }
  error?: string
}

class ChatAPI {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1'
  }

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      return await response.json()
    } catch (error) {
      console.error('Chat API error:', error)
      throw error
    }
  }

  async checkHealth(): Promise<HealthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/health`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Health check failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Health check error:', error)
      throw error
    }
  }

  async getAPIInfo(): Promise<any> {
    try {
      const response = await fetch('/api')
      
      if (!response.ok) {
        throw new Error('Failed to get API info')
      }

      return await response.json()
    } catch (error) {
      console.error('API info error:', error)
      throw error
    }
  }
}

// Export singleton instance
export const chatAPI = new ChatAPI()

// Utility functions for components
export async function sendChatMessage(
  message: string, 
  conversationId?: string,
  context?: any
): Promise<ChatResponse> {
  return chatAPI.sendMessage({
    message,
    conversation_id: conversationId,
    context
  })
}

export async function checkAPIHealth(): Promise<HealthResponse> {
  return chatAPI.checkHealth()
}
