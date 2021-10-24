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
    db.users[user_id] = { ...db.users[user_id], socket_id: socket.id }
    const contacts = searchContacts(user_id)
    const userConnected = searchUsersConnected(user_id)

    socket.emit("contacts", contacts)
    userConnected.forEach((id) => {
      const newContacts = searchContacts(id)
      socket.to(id).emit("contatcts", newContacts)
    })

    socket.on("message", (message) => {
      console.log(message.contact_id)
      socket.to(message.contact_id).emit("message", { contact_id: user_id, text: message.text, type: "GET", hour: "02:34 PM" })
      socket.emit("message", { contact_id: message.contact_id, text: message.text, type: "SEND", hour: "02:34 PM" })
    })

    socket.on("disconnect", () => {
      db.users[user_id] = { ...db.users[user_id], socket_id: undefined }
    })
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

function searchUsersConnected(user_id: string) {
  const connects: string[] = []
  Object.keys(db.users).forEach((id) => {
    if (db.users[id].socket_id) connects.push(String(db.users[id].socket_id))

    return
  })

  return connects
}