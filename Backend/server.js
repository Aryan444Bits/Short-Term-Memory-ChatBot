// 

require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/service/ai.service");

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Short-term memory
const chatHistory = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("ai-message", async (data) => {
    try {
      console.log("User Message:", data);

      // Store user message
      chatHistory.push({
        role: "user",
        content: data,
      });

      // Get AI response
      const response = await generateResponse(chatHistory);

      console.log("AI Response:", response);

      // Store assistant message
      chatHistory.push({
        role: "assistant",
        content: response,
      });

      // Keep only last 10 messages (short-term memory)
      if (chatHistory.length > 10) {
        chatHistory.splice(0, chatHistory.length - 10);
      }

      socket.emit("ai-message-response", { response });
    } catch (err) {
      console.error("AI Error:", err.message);

      socket.emit("ai-message-response", {
        response: "Sorry, AI is currently unavailable. Try again later.",
      });
    }
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});