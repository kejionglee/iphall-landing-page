#!/usr/bin/env python3
"""
Test script for the simplified Python API
"""

import asyncio
import sys
import os

# Add the lib directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'lib'))

async def test_api():
    """Test the simplified API with sample messages"""
    try:
        from python_api import process_chat_message, check_agent_health
        
        print("=== Testing API Health ===")
        health = await check_agent_health()
        print(f"Health check result: {health}")
        
        if not health.get("overall_healthy", False):
            print("API is not healthy. Please check your setup.")
            return
        
        print("\n=== Testing API Responses ===")
        
        # Test basic messages
        test_messages = [
            "Hello",
            "Help me",
            "What services do you offer?",
            "Tell me about your company"
        ]
        
        conversation_id = "test_session_123"
        
        for i, message in enumerate(test_messages, 1):
            print(f"\n--- Test {i}: Sending '{message}' ---")
            result = await process_chat_message(message, conversation_id)
            print(f"Response: {result.get('response', 'No response')}")
            print(f"Success: {result.get('success', False)}")
            print(f"Conversation ID: {result.get('conversation_id', 'None')}")
            
    except Exception as e:
        print(f"Error testing API: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_api())