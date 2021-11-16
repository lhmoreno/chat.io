import { Response } from 'express'
import { sign } from 'jsonwebtoken'

import { MyRequest } from '../middlewares/user'

export const authController = {
  async store(req: MyRequest, res: Response) {
    const id = req.userId
    
    const token = sign({ id }, '123')

    return res.status(201).json({ token })
  }
}
