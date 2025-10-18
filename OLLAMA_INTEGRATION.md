# IP AI Landing - Ollama Sales Quotation Agent Integration

This project now includes a complete Ollama-powered Sales Quotation Agent integrated with Next.js API routes, providing intelligent IP service quotations through natural language conversations.

## 🚀 Features

- **Ollama AI Agent**: Uses local Ollama models for intelligent conversation handling
- **LangChain Tools**: Structured tool calling for database operations
- **Real-time Chat**: Both general chat and quotation-specific widgets
- **Database Integration**: PostgreSQL with comprehensive quotation data
- **Context-Aware Responses**: Different responses based on widget type
- **Session Management**: Conversation memory and session tracking
- **Fallback System**: Graceful degradation when AI services are unavailable

## 🏗️ Architecture

```
Next.js Frontend
├── Chat Widget (General IP assistance)
├── Quotation Widget (Pricing inquiries)
└── API Routes
    ├── /api/v1/chat (Main chat endpoint)
    ├── /api/v1/health (Health check)
    └── Python Agent Integration
        ├── Ollama LLM (Local AI)
        ├── LangChain Tools
        └── PostgreSQL Database
```

## 📋 Prerequisites

1. **Node.js** (v18+)
2. **Python** (v3.8+)
3. **PostgreSQL** (v12+)
4. **Ollama** (Latest version)

## 🛠️ Installation

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Install Python Dependencies
```bash
npm run python:install
# or manually: pip install -r requirements.txt
```

### 3. Setup Database
```bash
# Create database and run schema
npm run db:setup

# Or reset and recreate
npm run db:reset
```

### 4. Install and Setup Ollama
```bash
# Install Ollama (macOS)
brew install ollama

# Start Ollama service
ollama serve

# Pull a model (in another terminal)
ollama pull llama3.2
```

### 5. Environment Configuration
Create `.env.local` file:
```env
# Database Configuration (using your existing SQLModel setup)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/iphall

# Ollama Configuration
OLLAMA_MODEL=llama3.2
OLLAMA_URL=http://localhost:11434
OLLAMA_TEMPERATURE=0.2

# API Configuration
NEXT_PUBLIC_API_URL=/api/v1
```

## 🚀 Usage

### Start Development Server
```bash
npm run dev
```

### Test the Integration
1. Visit `http://localhost:3000`
2. Use the chat widgets to interact with the AI agent
3. Try queries like:
   - "I need a trademark quotation for Malaysia"
   - "Show me all available services"
   - "What's the cost for patent filing in Singapore?"

## 🔧 API Endpoints

### Chat API
- **POST** `/api/v1/chat` - Send messages to the AI agent
- **GET** `/api/v1/chat` - Get API information

### Health Check
- **GET** `/api/v1/health` - Check system health

### Request Format
```json
{
  "message": "I need a trademark quotation for Malaysia",
  "conversation_id": "optional_session_id",
  "context": {
    "widget_type": "quotation",
    "service_context": "pricing_inquiry"
  }
}
```

### Response Format
```json
{
  "response": "For TRADEMARK in MALAYSIA (Trademark Application Filing): Professional Fee = 2500.00 MYR, Official Fee = 1500.00 MYR, Disbursement = 200.00 MYR, Total = 4200.00 MYR.",
  "conversation_id": "conv_1234567890_abc123",
  "timestamp": "2024-01-01T00:00:00Z",
  "suggestions": ["Get detailed breakdown", "Schedule consultation"]
}
```

## 🛠️ Development

### Available Scripts
```bash
npm run dev              # Start Next.js development server
npm run build            # Build for production
npm run start            # Start production server
npm run python:install  # Install Python dependencies
npm run python:test      # Run Python tests
npm run db:setup         # Setup quotationlist table in existing database
npm run db:reset         # Reset quotationlist table
npm run db:test          # Test database and agent health
```

### Project Structure
```
├── app/
│   ├── api/v1/          # API routes
│   └── page.tsx         # Main page
├── components/
│   ├── chat-widget.tsx  # General chat widget
│   └── quotation-inquiry.tsx # Quotation widget
├── lib/
│   ├── agent.py         # Ollama agent implementation
│   ├── quotation_tool.py # Database tools
│   ├── models.py        # Pydantic models
│   └── python_api.py    # Python API wrapper
├── database/
│   └── schema.sql       # Database schema
└── requirements.txt    # Python dependencies
```

## 🔍 Troubleshooting

### Common Issues

1. **Ollama Connection Error**
   - Ensure Ollama is running: `ollama serve`
   - Check model is installed: `ollama list`
   - Verify OLLAMA_URL in environment

2. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env.local`
   - Run `npm run db:setup` to create tables

3. **Python Import Errors**
   - Install dependencies: `npm run python:install`
   - Check Python version: `python --version`
   - Verify virtual environment if using one

4. **Chat Widget Not Responding**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Test with `/api/v1/health` endpoint

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

## 🎯 Customization

### Adding New Services
1. Update `database/schema.sql` with new service data
2. Modify `lib/quotation_tool.py` if needed
3. Test with the chat interface

### Changing AI Model
1. Update `OLLAMA_MODEL` in `.env.local`
2. Pull new model: `ollama pull <model_name>`
3. Restart the development server

### Customizing Responses
1. Modify prompts in `lib/agent.py`
2. Update tool descriptions in `lib/quotation_tool.py`
3. Adjust context handling in API routes

## 📈 Performance

- **Response Time**: ~2-5 seconds (depending on model size)
- **Concurrent Users**: Limited by Ollama instance
- **Database**: Optimized with indexes for fast queries
- **Memory Usage**: Varies by Ollama model size

## 🔒 Security

- Database credentials in environment variables
- No sensitive data in client-side code
- Input validation on all API endpoints
- SQL injection protection via parameterized queries

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue on GitHub
4. Check Ollama documentation for AI model issues
