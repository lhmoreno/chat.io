import { Router } from 'express'

import { UserController } from '../../controllers/UserController'
import { ChatController } from '../../controllers/ChatController'

const routes = Router()

// My routes
routes.post('/user', UserController.createSession)
routes.put('/user', UserController.editUser)
routes.get('/user', UserController.showUser)
routes.get('/contacts', UserController.indexContacts)

routes.post('/message/:user_id_2', ChatController.createMessage)
routes.get('/chat/:user_id_2', ChatController.indexMessages)

// Bad request
routes.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

export { routes }
