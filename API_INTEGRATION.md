# IP AI Landing - API Integration

This project now includes a Next.js API backend that provides the same functionality as the original FastAPI backend.

## API Endpoints

### Main API Info
- **GET** `/api` - Returns API information and available endpoints

### Health Check
- **GET** `/api/v1/health` - Health check endpoint that tests database connectivity

### Chat API
- **POST** `/api/v1/chat` - Send messages to the AI quotation bot
- **GET** `/api/v1/chat` - Returns chat API information

## Request/Response Formats

### Chat Request
```json
{
  "message": "string",
  "conversation_id": "string (optional)",
  "context": "any (optional)"
}
```

### Chat Response
```json
{
  "response": "string",
  "conversation_id": "string",
  "timestamp": "string (ISO 8601)",
  "suggestions": ["string array (optional)"]
}
```

### Health Response
```json
{
  "status": "healthy | unhealthy",
  "timestamp": "string (ISO 8601)",
  "database": "connected | disconnected",
  "services": {
    "database": "up | down",
    "agent": "ready | unknown",
    "api": "running"
  },
  "error": "string (optional, only on error)"
}
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quotation_bot
DB_USER=postgres
DB_PASSWORD=password

# API Configuration
NEXT_PUBLIC_API_URL=/api/v1

# Application Configuration
NODE_ENV=development
PORT=3000
```

## Features

- **Real-time Chat**: Both chat widgets now use the API endpoints
- **Conversation Management**: Maintains conversation IDs across messages
- **Error Handling**: Proper error handling with user-friendly messages
- **Health Monitoring**: Built-in health check endpoint
- **Database Integration**: Ready for database integration (currently using mock responses)

## Usage

The chat widgets (`ChatWidget` and `QuotationInquiry`) automatically use the new API endpoints. No additional configuration is needed for basic functionality.

## Development

1. Install dependencies: `npm install`
2. Set up environment variables in `.env.local`
3. Run the development server: `npm run dev`
4. Test the API endpoints at `http://localhost:3000/api/v1/health`

## Next Steps

To complete the integration:

1. **Database Setup**: Replace the mock database functions in `lib/database.ts` with actual database connections
2. **AI Integration**: Replace the mock AI responses in `app/api/v1/chat/route.ts` with actual AI service calls
3. **Authentication**: Add authentication middleware if needed
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Logging**: Add proper logging and monitoring

