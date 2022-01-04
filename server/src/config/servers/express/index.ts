import express from 'express'
import cors from 'cors'

import { routes } from './routes'

export function createServerExpress() {
  const app = express()
  
  app.use(cors())
  app.use(express.json())
  app.use(routes)

  return app
}
