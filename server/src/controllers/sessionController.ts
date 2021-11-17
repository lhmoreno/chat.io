import { Request, Response } from 'express'

import { userService } from '../services/userService'
import { sessionService } from '../services/sessionService'

import { isServiceError } from '../@types/VerifyType'

export const sessionController = {
  async create(req: Request, res: Response) {
    try {
      const { user_id } = await userService.create(req.query.name)
      const token = sessionService.create(user_id)

      return res.status(201).json({ token })
    } catch (err) {
      if (isServiceError(err)) return res.status(err.status).json({ message: err.message })

      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async show(req: Request, res: Response) {
    const user_id = req.user_id as string
    const contacts = await userService.findAllContacts(user_id)

    return res.status(200).json({ contacts })
  }
}
