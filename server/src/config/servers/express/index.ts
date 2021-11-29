import express from 'express'

import { routes } from './routes'

export function createServerExpress() {
  const app = express()
  
  app.use(express.json())
  app.use(routes)

  return app
}
