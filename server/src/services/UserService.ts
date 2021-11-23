import { sign } from 'jsonwebtoken'

import { UserRepository } from '../repositories/UserRepository'

async function createUser(name: string) {
  try {
    return await UserRepository.createUser(name)
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: '!! Error creating user !!'
    } as ServiceError
  }
}

async function createToken(user_id: IdMongo) {
  try {
    return sign({ user_id }, '123')
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: '!! Error creating token !!'
    } as ServiceError
  }
}

async function findAllUsersBut(user_id: IdMongo) {
  try {
    const documents = await UserRepository.findAllUsersBut(user_id)

    return documents.map((document) => ({
      id: document.id,
      name: document.name,
      isBot: document.isBot
    }) as User)
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error',
      message_server: '!! Error fetching contacts !!'
    } as ServiceError
  }
}

export const UserService = { createUser, createToken, findAllUsersBut }
