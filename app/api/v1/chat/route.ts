import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'

interface ChatMessage {
  sender: "user" | "agent"
  text: string
  timestamp?: string
}

interface ChatRequest {
  message: string
  conversation_id?: string
  context?: any
}

interface ChatResponse {
  response: string
  conversation_id: string
  timestamp: string
  suggestions?: string[]
}

// Function to call Python agent
async function callPythonAgent(message: string, conversationId?: string, context?: any): Promise<ChatResponse> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [
      '-c',
      `
import sys
import os
import asyncio
import json
sys.path.append('${process.cwd()}/lib')
from python_api import process_chat_message

async def main():
    result = await process_chat_message("${message.replace(/"/g, '\\"')}", "${conversationId || ''}", ${JSON.stringify(context || {})})
    print(json.dumps(result))

asyncio.run(main())
      `
    ], {
      cwd: process.cwd(),
      env: { ...process.env }
    })

    let output = ''
    let error = ''

    pythonProcess.stdout.on('data', (data) => {
      const dataStr = data.toString()
      output += dataStr
      console.log('🐍 PYTHON OUTPUT:', dataStr.trim())
    })

    pythonProcess.stderr.on('data', (data) => {
      const dataStr = data.toString()
      error += dataStr
      console.error('🐍 PYTHON ERROR:', dataStr.trim())
    })

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python process error:', error)
        reject(new Error(`Python process exited with code ${code}: ${error}`))
        return
      }

      try {
        const lines = output.trim().split('\n')
        let jsonLine = ''
        
        for (const line of lines) {
          const trimmedLine = line.trim()
          if (trimmedLine.startsWith('{') && trimmedLine.endsWith('}')) {
            jsonLine = trimmedLine
            break
          }
        }
        
        if (!jsonLine) {
          throw new Error('No valid JSON found in output')
        }
        
        const result = JSON.parse(jsonLine)
        
        const response: ChatResponse = {
          response: result.response || "I'm sorry, I couldn't process your request.",
          conversation_id: result.conversation_id || conversationId || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: result.timestamp || new Date().toISOString(),
          suggestions: result.suggestions || []
        }
        
        resolve(response)
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Output:', output)
        reject(new Error(`Failed to parse Python output: ${parseError}`))
      }
    })

    pythonProcess.on('error', (err) => {
      console.error('Python process spawn error:', err)
      reject(new Error(`Failed to spawn Python process: ${err.message}`))
    })
  })
}

// Simple mock response generator
function generateMockResponse(message: string, context?: any): { response: string; suggestions?: string[] } {
  const lowerMessage = message.toLowerCase()
  
  // Basic responses
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return {
      response: "Hello! How can I help you today?",
      suggestions: ["Tell me about your services", "Contact information", "Pricing"]
    }
  }
  
  if (lowerMessage.includes("help")) {
    return {
      response: "I'm here to help! You can ask me about our services, get contact information, or learn more about our company.",
      suggestions: ["Services", "Contact", "About us"]
    }
  }
  
  if (lowerMessage.includes("services")) {
    return {
      response: "We offer a range of intellectual property services including patent applications, trademark registration, copyright protection, and more.",
      suggestions: ["Patent services", "Trademark services", "Copyright services", "Contact us"]
    }
  }
  
  // Default response
  return {
    response: "Thank you for your message. I'm here to help with any questions you might have about our services.",
    suggestions: ["Services", "Contact", "Help"]
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { message, conversation_id, context } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        {
          error: "Message is required and must be a string",
          success: false
        },
        { status: 400 }
      )
    }

    let response: ChatResponse

    try {
      response = await callPythonAgent(message, conversation_id, context)
    } catch (error) {
      console.error('Python agent error:', error)

      const mockResponseData = generateMockResponse(message, context)
      const convId = conversation_id || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      response = {
        response: mockResponseData.response,
        conversation_id: convId,
        timestamp: new Date().toISOString(),
        suggestions: mockResponseData.suggestions
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        error: "Internal server error",
        detail: error instanceof Error ? error.message : "Unknown error",
        success: false
      },
      { status: 500 }
    )
  }
}