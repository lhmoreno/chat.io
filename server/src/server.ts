import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { user } from './middlewares/user'
import { authController } from './controllers/authController'
import { userController } from './controllers/userController'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.json())

app.post('/user', user.create, authController.store)
app.get('/user', user.check, userController.show)

httpServer.listen(3333)
