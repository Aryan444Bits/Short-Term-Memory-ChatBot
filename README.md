# Short-Term Memory ChatBot 🧠

A real-time AI conversational agent capable of maintaining context for short durations. Built with a modern **React** frontend and **Node.js** backend, this application utilizes **Socket.io** for instant bidirectional communication and the **DeepSeek** model (via OpenRouter) for intelligent responses.

## 🚀 Features

- **Contextual Awareness**: Remembers the last 10 messages to maintain conversation flow (Short-Term Memory).
- **Real-Time Communication**: Instant messaging powered by Socket.io.
- **Smart AI Responses**: Integrates with the DeepSeek model for human-like interaction.
- **Interactive UI**: Features real-time typing indicators ("AI is typing...") and auto-scroll functionality.
- **Modern Stack**: Built with Vite, React, and Express.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Socket.io-client**
- **CSS3** (Custom styling)

### Backend
- **Node.js & Express**
- **Socket.io** (Server)
- **Axios** (API requests)
- **OpenRouter API** (DeepSeek/DeepSeek-Chat interaction)

## 📋 Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- An API Key from [OpenRouter](https://openrouter.ai/)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Short-Term-Memory-ChatBot.git
cd Short-Term-Memory-ChatBot
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure the environment.

```bash
cd Backend
npm install
```

**Create a `.env` file** in the `Backend/` folder and add your API key:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3000
```

Start the server:
```bash
npm start
# or
node server.js
```
*The backend will run on `http://localhost:3000`.*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and start the application.

```bash
cd Frontend
npm install
npm run dev
```
*The frontend will normally run on `http://localhost:5173`.*

## 📖 Usage

1. Ensure both Backend and Frontend servers are running.
2. Open your browser to the local frontend URL (e.g., `http://localhost:5173`).
3. Type a message in the chat input and hit Send.
4. The AI will respond, remembering the context of your recent conversation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the **ISC License**.

