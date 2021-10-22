import express from "express"
import cookieParser from "cookie-parser"
import { createServer } from "http"
import { Server } from "socket.io"

import { config } from "./config"
import { routes } from "./routes"

// Create Server
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

// Routes
app.use(express.json())
app.use(cookieParser())
app.use("/static", express.static(config.path_public))
app.use(routes)

/*
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
*/

// Run Server
httpServer.listen(process.env.PORT ? process.env.PORT : 3000)
