import { Request, Response } from 'express'

import { UserService } from '../services/UserService'
import { utils } from '../validators/utils'

async function createSession(req: Request, res: Response) {
  const { name } = req.body

  // Validators
  if (typeof(name) !== 'string') return res.status(400).json({ error: 'Invalid name' })
  if (name.length > 10) return res.status(400).json({ error: 'Name maximum length 10 characters' })

  try {
    // Services
    const user = await UserService.createUser(name)
    const token = await UserService.createToken(user._id)

    return res.status(200).json({ token })
  } catch (err) {
    if (utils.isServiceError(err)) {
      err.message_server && console.log(err.message_server)
      return res.status(err.status).json({ error: err.error })
    }
    console.log(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const UserController = { createSession }
