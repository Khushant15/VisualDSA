import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, User } from 'lucide-react';
import '../styles/faq-chatbot.css'; 

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm the VisualDSA AI Assistant. I can help you understand algorithms, data structures, or debug your code. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleToggle = () => setIsOpen(prev => !prev);

  const fetchGroqResponse = async (userMessage) => {
    try {
      const chatHistory = messages.map(m => ({
        role: m.sender === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));

      chatHistory.push({ role: 'user', content: userMessage });

      const systemPrompt = {
        role: "system",
        content: "You are the VisualDSA AI Assistant. You help users learn Data Structures and Algorithms. You provide clear, concise, and helpful explanations. Be friendly, encouraging, and write your responses in markdown if you need to show code. Keep responses relatively short so they fit in a small chat window."
      };

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [systemPrompt, ...chatHistory],
          temperature: 0.7,
          max_tokens: 300,
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Chatbot error:", error);
      return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    const botResponse = await fetchGroqResponse(userMessage);
    
    setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    setIsLoading(false);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Bot size={18} />
              <h3>VisualDSA Assistant</h3>
            </div>
            <button onClick={handleToggle} className="close-btn"><X size={18} /></button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={16} className="spin" />
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-footer" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputValue.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
      <button className="chat-toggle-btn" onClick={handleToggle} style={{bottom: "30px", position: "fixed", right: "30px", marginBottom: 0}}>
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default AIChatbot;
