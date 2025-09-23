import { useState, useRef, useEffect } from 'react'
import './App.css'
import {io} from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [conversations, setConversations] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversations])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      
      // Add user message
      setConversations(prev => [...prev, {
        id: Date.now(),
        text: message,
        sender: 'user',
        time: timestamp
      }])

      socket.emit("ai-message", message)

      
      setMessage('')
    }
  }
  
  useEffect(()=>{
    let socketIns = io("http://localhost:3000");
    setSocket(socketIns)
    
    socketIns.on("ai-message-response", (response) => {
      
      const botMessage = {
        id: Date.now()+1,
        text: response.response,
        sender: 'bot',
      }
      setConversations(prev => [...prev, botMessage])
    })
  },[])

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">CB</div>
          <div className="chat-details">
            <h2>ChatBot</h2>
            <p>Online</p>
          </div>
        </div>
      </div>
      
      <div className="chat-messages">
        {conversations.map((msg) => (
          <div 
            key={msg.id} 
            className={`message-wrapper ${msg.sender === 'user' ? 'user-wrapper' : 'bot-wrapper'}`}
          >
            <div className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
              {msg.text}
              {/* <span className="message-time">{msg.time}</span> */}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default App
