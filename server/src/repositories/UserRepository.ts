import { UserModel } from '../models/UserModel'

async function createUser(name: string) {
  const document = await UserModel.create({ name })

  return document.toObject()
}

async function updateNameUser(user_id: string, newName: string) {
  const user = await UserModel.findById(user_id).lean()
  if (!user) return null

  const document = await UserModel.findByIdAndUpdate(user_id, { ...user, name: newName })
  if (!document) return null

  return document.toObject()
}

async function findUser(user_id: string) {
  return await UserModel.findById(user_id).lean()
}

async function findAllUsersBut(user_id: string) {
  return await UserModel.find({ _id: { $nin: [user_id] } }).lean()
}

export const UserRepository = { createUser, updateNameUser, findUser, findAllUsersBut }
