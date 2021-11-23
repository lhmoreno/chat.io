// MongoDB
type IdMongo = import('mongoose').Schema.Types.ObjectId

interface User {
  id: IdMongo
  name: string
  isBot?: boolean
}

enum MessageStatus {
  sent = 'sent',
  received = 'received',
  viewed = 'viewed'
}

interface Message {
  id: IdMongo
  user_id: IdMongo
  text: string
  hour: string
  status: MessageStatus
}

interface Chat {
  id: IdMongo
  users: [IdMongo, IdMongo]
  messages: Message[]
}

interface QueueChat {
  chat_id: IdMongo
  messages: IdMongo[]
}

interface Queue {
  user_id: IdMongo
  chats: QueueChat[]
}

// Utils
interface ServiceError {
  status: number
  error: string
  message_server?: string
}

// Functions
function isServiceError(err: unknown): err is ServiceError {
  if (typeof(err.status) !== 'number') return false
  if (typeof(err.message) !== 'string') return false
  if (typeof(err.message_server) !== 'string' || typeof(err.message_server) !== 'undefined') return false

  return err
}
