import { Request, Response } from 'express'

import { utils } from '../validators/utils'
import { UserService } from '../services/UserService'
import { UserView } from '../views/UserView'

async function createSession(req: Request, res: Response) {
  const { name } = req.body

  // Validators
  if (typeof(name) !== 'string') return res.status(400).json({ error: 'Invalid name' })
  if (name.length > 10) return res.status(400).json({ error: 'Name maximum length 10 characters' })

  try {
    // Services
    const { _id } = await UserService.createUser(name)
    const token = await UserService.createToken(_id)

    return res.status(201).json({ token })
  } catch (err) {
    if (utils.isServiceError(err)) {
      err.message_server && console.log(err.message_server)
      return res.status(err.status).json({ error: err.error })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function editUser(req: Request, res: Response) {
  const token = req.headers.authorization
  const { name } = req.body

  // Validators
  if (typeof(token) !== 'string') return res.status(401).json({ error: 'Token is a requirement' })
  if (typeof(name) !== 'string') return res.status(400).json({ error: 'Invalid name' })
  if (name.length > 10) return res.status(400).json({ error: 'Name maximum length 10 characters' })

  try {
    // Services
    const user_id = await UserService.findUserIdByToken(token.split(' ')[1])
    const newUser = await UserService.updateNameUser(user_id, name)

    const user = UserView.render(newUser)

    return res.status(200).json({ user })
  } catch (err) {
    if (utils.isServiceError(err)) {
      err.message_server && console.log(err.message_server)
      return res.status(err.status).json({ error: err.error })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function showUser(req: Request, res: Response) {
  const token = req.headers.authorization

  // Validators
  if (typeof(token) !== 'string') return res.status(401).json({ error: 'Token is a requirement' })

  try {
    // Services
    const user_id = await UserService.findUserIdByToken(token.split(' ')[1])
    const user_db = await UserService.findUser(user_id)

    const user = UserView.render(user_db)

    return res.status(200).json({ user })
  } catch (err) {
    if (utils.isServiceError(err)) {
      err.message_server && console.log(err.message_server)
      return res.status(err.status).json({ error: err.error })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function indexContacts(req: Request, res: Response) {
  const token = req.headers.authorization

  // Validators
  if (typeof(token) !== 'string') return res.status(401).json({ error: 'Token is a requirement' })

  try {
    // Services
    const user_id = await UserService.findUserIdByToken(token.split(' ')[1])
    const users_db = await UserService.findAllUsersBut(user_id)

    const contacts = UserView.renderManyContacts(users_db)

    return res.status(200).json({ contacts })
  } catch (err) {
    if (utils.isServiceError(err)) {
      err.message_server && console.log(err.message_server)
      return res.status(err.status).json({ error: err.error })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const UserController = { createSession, editUser, showUser, indexContacts }
