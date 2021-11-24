import { UserModel } from '../models/UserModel'

async function createUser(name: string) {
  const document = await UserModel.create({ name })

  return document.toObject()
}

async function findUser(user_id: string) {
  return await UserModel.findOne({ _id: user_id }).lean()
}

export const UserRepository = { createUser, findUser }
