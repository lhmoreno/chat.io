import { sign } from 'jsonwebtoken'

export const sessionService = {
  create(user_id: string) {
    const token = sign({ user_id }, '123')

    return token
  }
}
