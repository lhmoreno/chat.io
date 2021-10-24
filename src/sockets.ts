import { parse } from "cookie"
import { Server } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

import { db } from "./database"

interface Contact {
  contact_id: string
  name: string
  type: "offline" | "online" | "writing"
}

export function sockets(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
  io.on("connection", (socket) => {
    const user_id = parse(String(socket.handshake.headers.cookie))?.user_id
    const contacts = searchContacts(user_id)

    socket.emit("contacts", contacts)
  })
}

function searchContacts(user_id: string) {
  const contacts_id = Object.keys(db.users).filter((id) => id !== user_id)
  const contacts: Contact[] = contacts_id.map((id) => { 
    if (id === "bot") return {
      contact_id: id, 
      name: db.users[id].name, 
      type: "online"
    }

    return {
      contact_id: id, 
      name: db.users[id].name, 
      type: db.users[id].socket_id ? "online" : "offline"
    }
  })

  return contacts
}

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