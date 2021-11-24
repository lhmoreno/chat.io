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
  id: string
  name: string
  isBot?: boolean
}

// Service
export interface ServiceError { 
  status: number, 
  error: string, 
  message_server?: string
}
