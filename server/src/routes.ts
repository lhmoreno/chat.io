import { Router } from 'express'

import { UserController } from './controllers/UserController'

const routes = Router()

// My routes
routes.post('/user', UserController.createSession)
routes.get('/user', UserController.showUser)

// Bad request
routes.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

export { routes }
