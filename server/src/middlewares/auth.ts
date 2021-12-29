import { Socket as IO } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'

import { UserService } from '../services/UserService'

interface Socket extends IO {}
type NextFn = (err?: ExtendedError | undefined) => void

export const auth = {
  async io(socket: Socket, next: NextFn) {
    const { token } = socket.handshake.auth
    if (!token) return socket.disconnect()

    try {
      const user_id = await UserService.findUserIdByToken(token)
      const user = await UserService.findUser(user_id)

      if (user) {
        socket.handshake.user_id = user_id
        next()
      } else {
        return socket.disconnect()
      }
    } catch (err) {
      return socket.disconnect()
    }
  }
}
