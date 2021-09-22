import express from "express"
import path from "path"
import { createServer } from "http"
import { Server } from "socket.io"

import { db } from "./database"

// Create Server
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

// Routes
const pathPublic = path.join(__dirname, "..", "public")
app.use("/static", express.static(pathPublic))
app.get("/", (req, res) => res.sendFile(path.join(pathPublic, "login", "index.html")))
app.get("/chat", (req, res) => res.sendFile(path.join(pathPublic, "chat", "index.html")))

// Chat Socket.io
io.on("connection", (socket) => {
  const username = socket.handshake.query.name as string
  const isUserExists = !!db.users.find(({ name }) => name === username)

  let indexUser = 0

  // Create or update user
  if (!isUserExists) {
    const index = db.users.push({
      name: username,
      socket_id: socket.id,
      messages: {}
    })

    indexUser = index - 1

    // Send contact
    socket.broadcast.emit("contact", username)
  } else {
    const index = db.users.findIndex(({ name }) => name === username)
    db.users[index] = { ...db.users[index], socket_id: socket.id }
    indexUser = index
  }

  // First data
  const contacts = db.users.map(({ name }) => name).filter((name) => name !== username)
  const { messages } = db.users[indexUser]
  socket.emit("login", { contacts, messages})

  // Send message
  socket.on("send_message", ({ message, name }) => {
    const user = db.users.find((user) => name === user.name)

    if (user) {
      const { name: from } = db.users[indexUser]

      socket.emit("get_message", from, { text: message, type: "send" })
      socket.to(user.socket_id).emit("get_message", from, { text: message, type: "get" })
    }
  })
});

// Run Server
httpServer.listen(3000);
