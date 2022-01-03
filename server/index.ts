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

declare module 'socket.io/dist/socket' {
  export interface Handshake {
    user_id: string
  }
}

// Database
export interface UnreadMessage {
  user_id: string
  count: number
}

export interface User {
  _id: string
  name: string
  unread: UnreadMessage[]
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
  user_id: string
  text: string
  hour: string
  status: MessageStatus
}

export interface Chat {
  _id: string
  users: [string, string]
  messages: Message[]
  __v: number
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
