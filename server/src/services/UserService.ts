import { ServiceError } from '../@types'

import { sign } from 'jsonwebtoken'

import { UserRepository } from '../repositories/UserRepository'

async function createUserAndToken(name: string) {
  try {
    const user = await UserRepository.createUser(name)
    const token = sign({ user_id: user._id }, '123')

    return token
  } catch (err) {
    throw { status: 500, message: 'Internal server error' } as ServiceError
  }
}

async function findAllUsersBut(user_id: string) {
  try {
    const users = await UserRepository.findAllUsersBut(user_id)

    return users
  } catch (err) {
    throw { status: 500, message: 'Internal server error' } as ServiceError
  }
}

export const UserService = { createUserAndToken, findAllUsersBut }
