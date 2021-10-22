interface UserSocket {
  [user_id: string]: {
    name: string
    socket_id?: string
  }
}

interface Queue {
  user_id: string
  message_queue: {
    receiver_id: string
    text: string
  }[]
}

const users: UserSocket = { "123": { name: "Gideon", socket_id: "456" } }
const queues: Queue[] = []

export const db = { users, queues }
