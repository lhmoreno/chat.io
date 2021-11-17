import { ServiceError } from '../@types'

import { ioServer } from '..'
import { users} from '../database/data.json'

export const userService = {
  async create(name: any) {
    if (typeof(name) !== "string") throw { status: 400, message: 'Insert valid name' } as ServiceError

    ioServer.emit('contact', { user_id: '5', name })

    return { user_id: '5' }
  },

  async findAllContacts(user_id: string) {
    const contacts = users.filter(user => user.id !== user_id)

    return contacts
  }
}
