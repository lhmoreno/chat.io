import express from 'express'
import cors from 'cors'

import { UserController } from '../controllers/UserController'
import { ChatController } from '../controllers/ChatController'
import { auth } from '../middlewares/auth'

export function createExpress() {
  const app = express()
  
  app.use(cors())
  app.use(express.json())
  
  app.post('/sigin', UserController.create)
  app.get('/login', auth.express, UserController.index)

  app.get('/chat/:id', auth.express, ChatController.show)

  return app
}
