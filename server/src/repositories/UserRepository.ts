import { UserModel } from '../models/User'

async function createUser(name: string) {
  const document = await UserModel.create({ name })
  return document.id as IdMongo
}

async function findAllUsersBut(user_id: IdMongo) {
  return await UserModel.find({ _id: { $nin: [user_id] } }).lean()
}

export const UserRepository = { createUser, findAllUsersBut }
