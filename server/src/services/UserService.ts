import { sign } from 'jsonwebtoken'

import { UserRepository } from '../repositories/UserRepository'

import { ServiceError } from '../..'

const { APP_SECRET } = process.env

async function createUser(name: string) {
  try {
    return await UserRepository.createUser(name)
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

export const UserService = { createUser, createToken }
