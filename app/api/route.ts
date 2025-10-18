import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: "Sales Quotation Bot API",
    version: "1.0.0",
    description: "AI-powered sales quotation bot with LangChain and PostgreSQL",
    endpoints: {
      chat: "/api/v1/chat",
      health: "/api/v1/health",
      docs: "/docs",
      redoc: "/redoc"
    }
  })
}

