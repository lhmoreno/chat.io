interface Message {
  type: "send" | "get"
  text: string
}

interface User {
  name: string
  socket_id: string
  messages: {
    [name: string]: Message[]
  }
}

const users: User[] = []

export const db = { users }
