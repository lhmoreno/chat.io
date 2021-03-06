import { User } from '../types'
import { UserModel } from '../models/UserModel'

async function createUser(name: string) {
  const user = new UserModel({
    name,
    unread: []
  })
  
  await user.save()

  const _id = user._id as string
  const __v = user.__v as number

  return { _id, name, unread: [], __v } as User
}

async function createUnreadByUser(user: User, user_id_unread: string) {
  const newUnread = user.unread
  const index = newUnread.findIndex(({ user_id }) => user_id === user_id_unread)

  if (index === -1) {
    newUnread.push({
      user_id: user_id_unread,
      count: 1
    })
  } else {
    newUnread[index].count += 1
  }


  const document = new UserModel({ 
    _id: user._id,
    unread: newUnread,
    __v: user.__v
  })

  await UserModel.updateOne({ _id: user._id }, document)

  return newUnread
}

async function updateUnreadByUsersIds(user_id: string, user_id_unread: string) {
  const user = await findUser(user_id)
  const index = user.unread.findIndex((unread) => unread.user_id === user_id_unread)
  
  if (index === -1 || user.unread[index].count === 0) return false

  const newUnread = user.unread
  newUnread[index].count = 0

  await UserModel.updateOne({ _id: user._id }, { 
    _id: user._id,
    unread: newUnread,
    __v: user.__v
  })

  return true
}


async function updateNameUser(user_id: string, newName: string) {
  const document = await UserModel.findByIdAndUpdate(user_id, { name: newName })
  if (!document) throw {}

  const user = document.toObject()

  const _id = user._id as string
  const unread = user.unread
  const __v = user.__v as number

  return { _id, name: newName, unread, __v } as User
}

async function findUser(user_id: string) {
  const user = await UserModel.findById(user_id).lean()
  if (!user) throw {}

  return user
}

async function findAllUsersBut(user_id: string) {
  return await UserModel.find({ _id: { $nin: [user_id] } }).lean()
}

async function existsUser(user_id: string) {
  return await UserModel.exists({ _id: user_id })
}

export const UserRepository = { createUser, createUnreadByUser, updateUnreadByUsersIds, updateNameUser, findUser, findAllUsersBut, existsUser }
