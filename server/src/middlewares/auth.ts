import { Request, Response, NextFunction } from 'express'
import { Socket as IO } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'

import { verify } from 'jsonwebtoken'

import { isUserToken } from '../@types/VerifyType'

interface Socket extends IO {}
type NextFn = (err?: ExtendedError | undefined) => void

export const auth = {
  async express(req: Request, res: Response, next: NextFunction) {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).json({ message: 'Login to continue' })

    const token = jwt.split(' ')[1]

    try {
      const payload = verify(token, '123')
      if (!isUserToken(payload)) return res.status(401).json({ message: 'Login to continue' })

      req.user_id = payload.user_id
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Login to continue' })
    }
  },

  async io(socket: Socket, next: NextFn) {
    // const { token } = socket.handshake.auth
    // if (!token) return socket.disconnect()

    try {
      // const payload = verify(token, '123')
      // if (!isUserToken(payload)) return socket.disconnect()

      // socket.handshake.user_id = payload.user_id
      socket.handshake.user_id = socket.handshake.auth.user_id // Trash
      next()
    } catch (err) {
      return socket.disconnect()
    }
  }
}
