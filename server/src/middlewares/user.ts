import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export interface MyRequest extends Request {
  userId?: number
}

export const user = {
  async create(req: MyRequest, res: Response, next: NextFunction) {
    const { name } = req.query

    if (typeof(name) !== 'string') return res.status(400).json({ error: 'Insert valid name!' })

    req.userId = 1

    next()
  },

  async check(req: Request, res: Response, next: NextFunction) {
    const jwt = req.headers.authorization

    if (!jwt) return res.status(401).json({ error: 'Create a user!' })

    const token = jwt.split(' ')[1]

    try {
      verify(token, '123')
      next()
    } catch (err) {
      return res.status(401).json({ error: 'Create a user!' })
    }
  }
}
