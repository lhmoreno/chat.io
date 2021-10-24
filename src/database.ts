interface UserSocket {
  [user_id: string]: {
    name: string
    socket_id?: string
  }
}

interface Queue {
  [user_id: string]: {
    messages: {
      sender_id: string
      text: string
      date: string
    }[]
  }
}

const users: UserSocket = { "bot": { name: "Gideon" }, "admin": { name: "Luiz" }, "test": { name: "Test" } }
const queues: Queue[] = []

export const db = { users, queues }
