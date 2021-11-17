import express from 'express'

import { sessionController } from '../controllers/sessionController'
import { auth } from '../middlewares/auth'

export function createExpress() {
  const app = express()
  
  app.use(express.json())
  
  app.post('/sigin', sessionController.create)
  app.get('/login', auth.express, sessionController.show)

  return app
}