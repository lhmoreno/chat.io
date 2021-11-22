import { UserModel } from '../models/User'

async function createUser(name: string) {
  const document = await UserModel.create({ name })

  const user = document.toObject()

  return user
}

async function findAllUsersBut(user_id: string) {
  const users = await UserModel.find({ _id: { $nin: [user_id] } })

  return users
}

export const UserRepository = { createUser, findAllUsersBut }
