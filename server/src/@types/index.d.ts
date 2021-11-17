import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    export interface Request {
      user_id?: string
    }
  }
}

declare module 'socket.io/dist/socket' {
  export interface Handshake {
    user_id?: string
  }
}

export interface UserToken extends JwtPayload {
  user_id: string
}

export interface ServiceError {
  status: number
  message: string
}
