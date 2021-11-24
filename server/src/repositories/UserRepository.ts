import { UserModel } from '../models/UserModel'

async function createUser(name: string) {
  const document = await UserModel.create({ name })

  return document.toObject()
}

export const UserRepository = { createUser }
