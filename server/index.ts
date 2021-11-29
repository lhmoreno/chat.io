declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string
      APP_SECRET: string
      MONGO_ADMIN_USER: string
      MONGO_ADMIN_PASSWORD: string
      MONGO_HOST: string
      MONGO_PORT: string
      MONGO_NAME: string
    }
  }
}

// Database
export interface User {
  _id: string
  name: string
  isBot?: boolean
  __v: number
}

export enum MessageStatus {
  sent = 'sent',
  received = 'received',
  viewed = 'viewed'
}

export interface Message {
  _id: string
  user_id?: string
  text: string
  hour: string
  status: MessageStatus
}

export interface Chat {
  _id: string
  users: [string | undefined, string | undefined]
  messages: Message[]
  __v: number
}

export interface QueueMessages {
  chat_id?: string
  messages?: string[]
}

export interface QueueUser {
  user_id?: string
  chats: QueueMessages[]
}

// Service
export interface ServiceError { 
  status: number, 
  error: string, 
  message_server?: string
}

type Payload = import('jsonwebtoken').JwtPayload

export interface JwtPayload extends Payload {
  user_id: string
}
