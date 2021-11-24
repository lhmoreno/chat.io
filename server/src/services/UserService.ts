import { sign, verify } from 'jsonwebtoken'

import { UserRepository } from '../repositories/UserRepository'
import { utils } from '../validators/utils'

import { ServiceError, User } from '../..'

const { APP_SECRET } = process.env

async function createUser(name: string) {
  try {
    const user = await UserRepository.createUser(name)
    const _id = user._id as string
    const __v = user.__v as number

    return { _id, name, __v } as User
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create user'
    } as ServiceError
  }
}

async function createToken(user_id: string) {
  try {
    return sign({ user_id }, APP_SECRET)
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create token'
    } as ServiceError
  }
}

async function updateNameUser(user_id: string, newName: string) {
  try {
    const user = await UserRepository.updateNameUser(user_id, newName)

    if (user) {
      const __v = user.__v as number

      return { _id: user_id, name: newName, __v } as User
    }

  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service update name user'
    } as ServiceError
  }

  throw { 
    status: 400, 
    error: 'Invalid user or name'
  } as ServiceError
}

async function findUser(user_id: string) {
  try {
    const user = await UserRepository.findUser(user_id)

    if (user) return user
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create token'
    } as ServiceError
  }

  throw { 
    status: 400, 
    error: 'Invalid user'
  } as ServiceError
}

async function findUserIdByToken(token: string) {
  try {
    const decode = verify(token, APP_SECRET)

    if (utils.isJwtPayload(decode)) return decode.user_id
  } catch (err) {
    if (utils.isJsonWebTokenError(err)) {
      throw { 
        status: 401, 
        error: 'Invalid token'
      } as ServiceError
    }

    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service find user_id by token'
    } as ServiceError
  }

  throw { 
    status: 401, 
    error: 'Invalid token'
  } as ServiceError
}

async function findAllUsersBut(user_id: string) {
  try {
    return await UserRepository.findAllUsersBut(user_id)
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service find all users but'
    } as ServiceError
  }
}

export const UserService = { createUser, createToken, findUser, updateNameUser, findUserIdByToken, findAllUsersBut }
