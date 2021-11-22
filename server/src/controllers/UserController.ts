import { Request, Response } from 'express'

import { UserService } from '../services/UserService'
import { UserView } from '../views/UserView'

import { isServiceError } from '../@types/VerifyType'

async function create(req: Request, res: Response) {
  const { name } = req.query
  if (typeof(name) !== 'string') return res.status(400).json({ message: 'Name is required!' })

  try {
    const token = await UserService.createUserAndToken(name)

    return res.status(201).json({ token })
  } catch (err) {
    if (isServiceError(err)) return res.status(err.status).json({ message: err.message })

    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function index(req: Request, res: Response) {
  const user_id = req.user_id as string
  try {
    const documents = await UserService.findAllUsersBut(user_id)
    const contacts = UserView.renderMany(documents)
  
    return res.status(200).json({ contacts })
  } catch (err) {
    if (isServiceError(err)) return res.status(err.status).json({ message: err.message })

    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const UserController = { create, index }
